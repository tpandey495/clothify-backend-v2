const User = require('../models/users.model');

exports.Registration = async (req, res) => {
  try {
    const { firstname, lastname, username, password, email } = req.body;
    if (!email)
      res.status(400).json("please provide email");
    req.body.email = email.toLowerCase();
    req.body.firstname = firstname.toLowerCase();
    req.body.lastname = lastname.toLowerCase();
    req.body.username=username.toLowerCase();
    //Check If user already exist
    let isUser = await User.findOne({ email: req.body.email });
    if (isUser)
     return   res.status(400).json('user has already account with this email');

    const newUser = new User({ firstname, lastname, username, email, password });
    // Save the user to the database
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not create user' });
  }
}


// to Fetch all the data
exports.UserInfo = async (req, res) => {
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
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { $set: { deleted: true } },
      { new: true }
    );
    // If the user doesn't exist
    if (!deleteUser) 
      return res.status(404).json({ error: 'User not found' });
    // If the user is successfully deleted
    res.status(204).send('user deleted succesfully');
  } catch (error) {
    res.status(500).json({ error: 'Could not delete user' });
  }
}

// Update API
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedUserData },
      { new: true } // Return the updated document
    ).select('username firstname lastname email ').exec();
    if (!updatedUser) {
     return  res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Could not update user' });
  }
}



exports.login = async (req,res) => {
  try {
    let {username,password} = req.body;
    if (!username)
      res.status(400).json({error:"Please send username"});
    username = username.toLowerCase();
    let isUser = await User.findByCredentials(username, password);
    if (!isUser)
      return res.status(400).json({error:"user not exist"});
    res.status(200).json({ user: isUser });
  }
  catch (err) {
     res.status(500).json(err.message);
  }
}



exports.resetPassword = async (req, res) => { 
  try {
      const {password}= req.body;
      const _id=req.headers['user_id'];
      if (!password)  
        return res.status(400).json('Password Not Provided');
      const user = await User.findOne({ _id:_id });
    // If user does'nt Exist
      if (!user) 
      return res.status(400).json("user does'nt exists");
      user.password = password;
      await user.save();
      res.status(200).json('password has been reset successfully');
  }
  catch (error) {
       res.status(400).json({error:'could not reset password'});
  }
}