const express=require("express");
const route=express.Router();


const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user")
const {updateStock} = require("../controllers/product");


const {getOrderID, createOrder, getAllOrder, updateStatus, getOrderStatus} = require("../controllers/order");

//params
route.param("userId",getUserById);
route.param("orderId",getOrderID)

//create route

route.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);

//read route

route.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin, getAllOrder);

route.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus);
route.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus);
module.exports=route;