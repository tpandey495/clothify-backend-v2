const routers = require('express').Router();
const userModule=require('../controller/user.controller');
routers.use("/user/login",userModule.Registration);
module.exports=routers;