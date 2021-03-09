var express=require("express");
var router=express.Router();
const {check,validationResult}=require("express-validator");
const {signout,signup,signin,isSignedIn}=require("../controllers/auth");

router.post("/signup",[check("name","name should be atleast 3 charecter").isLength({min:3}),
                       check("email","must be write correct email").isEmail(),
                       check("password","must be write password atleast 6 charecter").isLength({min:6}) ],
            signup);

router.post("/signin",check("email","email should required").isEmail(),
                    check("password","password shoud be required").isLength({min:3}),
            signin);
            
router.get("/signout",signout);

// router.get("/testedrouter",isSignedIn,(req,res)=>{
//      res.json(req.auth);
// })

module.exports=router;