const routers = require('express').Router();
const userModule=require('../controller/user.controller');
routers.post("/user/login",userModule.Registration);
routers.get('/user',userModule.UserInfo);
module.exports=routers;