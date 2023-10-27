const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController")
const shopController = require("../Controller/shopController")



router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/me',userController.auth,userController.userInfo)


// --------Shop-----------------
router.post('/createshop',userController.auth,shopController.createshop)
router.get('/getallshop',userController.auth,shopController.getShop)
router.patch('/editshop/:id',userController.auth,shopController.editShop)
router.delete('/shop/delete/:id',userController.auth,shopController.deleteShop)
// router.get('/createshop',userController.auth,upload.single("banner"))
module.exports = router