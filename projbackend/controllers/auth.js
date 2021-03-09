const User=require("../models/user");
const {check,validationResult}=require("express-validator");
const jwt=require("jsonwebtoken");
const expressJwt=require("express-jwt");
const cookieparser=require("cookie-parser");

exports.signup=(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
      
   const user=new User(req.body);
   user.save((err,user)=>{
       if(err)
       {
           return res.status(400).json({
               err:"NOT able to save into the database"
           });
       }
       res.json({
           name:user.name,
           lastname:user.lastname,
           email:user.email,
           id:user._id
       });
   })
};

exports.signin=(req,res)=>{
    const {email,password}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(404).json({
            err:errors.array()[0].msg
        });
    }
const user=new User(req.body);
    User.findOne({email},(err,user)=>{
        if(err || !user)
        {
            return res.status(400).json({
                err:"email no exits please try again "
            })
        }
        if(!user.authanticate(password))
        {
            return res.status(400).json({
                err:"password not correct"
            });
        }

        //create token

        const token=jwt.sign({_id:user._id},process.env.SECRAT);

        //put token in cookie
        res.cookie("token",token,{expire:new Date()+9999});

        //send res to front end
        const {_id,name,email,role}=user;
        return res.json({token,user:{_id,name,email,role}});

    });
}


exports.signout=(req,res)=>{
    const c=res.clearCookie("token");
    res.json({
        messege:"user signout",
        uname:"vrunda",
        email:"vrunda.2511@gmail.com"
    })
};

//middleware
exports.isSignedIn=expressJwt({
    secret:process.env.SECRAT,
    userProperty: "auth"
})

//custome middleware
exports.isAuthenticated=(req,res,next)=>{
  
    let checker=req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker)
    {
        return res.status(403).json({
            err:"access denied"
        })
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0)
    {
        return res.status(403).json({
            err:"you are not admin access denied"
        })
    }
    next();
}

