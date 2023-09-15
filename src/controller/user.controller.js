const User=require('../models/users.model');

exports.Registration=async(req,res)=>{
    try {
    const { firstname,lastname,username, password, email} = req.body;
    if(!email)
    res.status(400).json("please provide email");
    req.body.email=email.toLowerCase();
    req.body.firstname=firstname.toLowerCase();
    req.body.lastname=lastname.toLowerCase();
    //Check If user already exist
    let isUser = await User.findOne({ email : req.body.email });
    if (isUser)
        return res.status(400).json('user has already account with this email');

    const newUser = new User({firstname,lastname,username, email, password});
    // Save the user to the database
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Could not create user' });
  }
}


// to Fetch all the data
exports.UserInfo=async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.find().select('username firstname lastname email').exec();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch user data' });
  }
}


// Delete API
exports.deleteUser=async (req, res) => {
  try {
    const userId = req.params.userId;
    const deleteUser=await User.findByIdAndUpdate(
      userId,
      { $set: { deleted: true } },
      { new: true } 
    );
    // If the user doesn't exist
    if (!deleteUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    // If the user is successfully deleted
    res.status(204).send('user deleted succesfully');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not delete user' });
  }
}