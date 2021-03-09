const express=require("express");
const router=express.Router();

const {getProductById,
     createProduct,
      getAllProduct,
      getProduct,
      photo,
      deleteProduct,
      updateProduct,
      getAllUniqueCategories}=require("../controllers/product");
const {isSignedIn,isAdmin,isAuthenticated}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");

//param getproductID
router.param("userId",getUserById);
router.param("productId",getProductById);

//actuall routes

//create
router.post("/product/createproduct/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

//read route
router.get("/product/getproduct/:productId",getProduct)
router.get("/product/photo/:productId",photo)
router.get("/product/getAllproduct",getAllProduct)
router.get("/product/categories",getAllUniqueCategories)

//delete prodcut

router.delete("/product/delproduct/:productId/:userId",isSignedIn,isAuthenticated,isAdmin, deleteProduct);

//update route

router.put("/product/updateproduct/:productId/:userId",isSignedIn,isAuthenticated,isAdmin, updateProduct);

module.exports=router;