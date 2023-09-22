const mongoose = require('../db');
const mongooseDelete = require('mongoose-delete');

const productSchema=new mongoose.Schema({
    user_id:{
       type:mongoose.Types.ObjectId,
       required:true,
       ref:'User',
    },
    name:{
       type:String,
       required:true,
       unique:true,
    },
    type:{
        type:String,
        required:true,
        enum:[0,1,2],
        // 0=kid's clothes,1=Women's Clothing 2=Men's Clothing
    },
    color:{
        type:String,
        required:true,
    },
    size:{
        type:String,
        required:true,
        // s=small,m=medium,l=large
    },
    isVerified:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    imgURL:{
        type:String,
        required:true,
    },
    },
    {
        timestamps:true,
    }
);


// Apply the mongoose-delete plugin to enable soft deletion
productSchema.plugin(mongooseDelete, { overrideMethods: true });
// Create User Model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;