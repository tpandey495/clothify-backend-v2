const routers = require('express').Router();
const userModule=require('../controller/user.controller');
routers.post("/user/signup",userModule.Registration);
routers.get('/user',userModule.UserInfo);
routers.delete('/user/:userId',userModule.deleteUser);
routers.put('/user/:userId',userModule.updateUser);
routers.post("/user/login",userModule.login);
routers.post("/user/resetpassword",userModule.resetPassword);

module.exports=routers;