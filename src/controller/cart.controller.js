const Cart=require('../models/cart.model');

exports.addtoCart=async(req,res)=>{
 try{
   const{productid,userid}=req.body;
    if(!productid)
      res.status(400).json({error:"Productid is not provided"});
    if(!userid)
      res.status(400).json({error:"Userid is not provided"});
   const cartitem=new Cart({product_id:productid,user_id:userid});
   await cartitem.save();
   res.status(200).json({message:'Item added succesfuly in the cart'});
 }
 catch(error){
    res.status(500).json(({error:"Error retrieving Products"}));
 }
}

exports.cartItems=async(req,res)=>{
   try{
    const userid=req?.user?._id;
      if(!userid)
       res.status(400).json({error:"user id is not provided"});
      const cartitem=await Cart.find({user_id:userid}).select('product_id').exec();
      res.status(200).json(cartitem);
   }
   catch(err){
   res.status(500).json({error:"Error retrieving Products"})
  }
}
