const mongoose = require('../db');
const mongooseDelete = require('mongoose-delete');
const bcrypt = require("bcrypt");
const saltRounds = 8;
const jwt = require("jsonwebtoken");

// Define User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
    },
   }, {
    timestamps: true,
   }
);

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    return token;
  };
  

//comparing the hash passwords
userSchema.statics.findByCredentials = async function (username, password) {
    const user = await this.findOne({username});
    if (!user) {
      throw { message: "User not found" };
    }
    console.log(password,user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { message: "Incorrect Password" };
    }
    return user;
  };

    //hashing the password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// Apply the mongoose-delete plugin to enable soft deletion
userSchema.plugin(mongooseDelete, { overrideMethods: true });
// Create User Model
const User = mongoose.model('User', userSchema);
module.exports = User;
