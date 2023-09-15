const mongoose = require('../db');
const mongooseDelete = require('mongoose-delete');

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

// Apply the mongoose-delete plugin to enable soft deletion
userSchema.plugin(mongooseDelete, { overrideMethods: true });
// Create User Model
const User = mongoose.model('User', userSchema);
module.exports = User;
