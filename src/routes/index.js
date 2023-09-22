const routers = require('express').Router();
const userModule=require('../controller/user.controller');
const multer = require('multer');
const productModule=require('../controller/product.controller');
const { verifyToken } = require('../middleware/index');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

// User Routes
routers.post("/user/signup",userModule.Registration);
routers.get('/user',userModule.UserInfo);
routers.delete('/user/:userId',verifyToken,userModule.deleteUser);
routers.put('/user/:userId',verifyToken,userModule.updateUser);
routers.post("/user/login",userModule.login);
routers.post("/user/resetpassword",verifyToken,userModule.resetPassword);

// Product Routes
routers.post("/product",upload.single('samplefile'),productModule.createProduct);
routers.get("/product",productModule.getProducts);
module.exports=routers;