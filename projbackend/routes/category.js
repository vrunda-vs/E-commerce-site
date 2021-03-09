const express=require("express");
const router=express.Router();
const {check,validationResult}=require("express-validator");

const {getCategoryById, createCategory, getCategory,getAllCategory,updateCategory,removeCategory}=require("../controllers/category");
const {getUserById}=require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin}=require("../controllers/auth");

//params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById)

//actuall routes 
//insert category
router.post("/category/createcategory/:userId",[check("name","name should be at least 3 charecter required").isLength({min:3})],isSignedIn,isAuthenticated,isAdmin,createCategory);

//read category
router.get("/category/getcategory/:categoryId",getCategory);
router.get("/category/allcategory/",getAllCategory);

//update routes

router.put("/category/updatecategory/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)


//delete
 
router.delete("/category/deletecategory/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory)
module.exports=router;