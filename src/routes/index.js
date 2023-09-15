const routers = require('express').Router();
const userModule=require('../controller/user.controller');
const { verifyToken } = require('../middleware/index');

routers.post("/user/signup",userModule.Registration);
routers.get('/user',userModule.UserInfo);
routers.delete('/user/:userId',verifyToken,userModule.deleteUser);
routers.put('/user/:userId',verifyToken,userModule.updateUser);
routers.post("/user/login",userModule.login);
routers.post("/user/resetpassword",verifyToken,userModule.resetPassword);

module.exports=routers;