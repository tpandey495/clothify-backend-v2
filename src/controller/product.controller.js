const Product = require('../models/product.model');
const User=require('../models/users.model');
const path = require('path');
const cloudinary = require("cloudinary").v2
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
})

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        let {user_id,name,color,type,size,isVerified,rating,price,description}=req.body;
        let file = req.file;
        if (!file) 
            return res.status(400).json({ message: 'No file provided', success: false });
        const user=await User.findOne({_id:user_id});
        if(!user)
            return res.status(400).json({message:"Invalid User"});
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file.path);
        const imgURL = result?.url;
        const newProduct = new Product({user_id,name,type,color,size,isVerified,rating,price, description,imgURL});
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', success: true });
    } catch (error) {
    console.log(error);
        res.status(400).json({ error: 'Error creating product' });
    }
}


// Get products ordered by date with a limit
exports.getProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; // Default limit is 10
        const products = await Product.find()
            .sort({ createdAt: -1 }) // Sort by date in descending order
            .limit(limit).select('name type color size  rating price description imgURL').exec(); // Limit the number of results
        res.status(200).json({ products, success: true });
    }catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Error retrieving products' });
    }
}



