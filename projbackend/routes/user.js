const express=require("express");
const router=express.Router();

const { getUserById, getUser, updateUser, userPurchaseList} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin}=require("../controllers/auth");

router.param("userId",getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated,getUser);
router.put("/updateuser/:userId",isSignedIn, isAuthenticated, updateUser);
router.get("/order/user/:userId",isSignedIn, isAuthenticated, userPurchaseList);

//router.get("/getalluser",getAllUser);


module.exports=router;


