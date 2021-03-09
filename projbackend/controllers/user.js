const User=require("../models/user");
const Order=require("../models/order");


exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user)
        {
            return res.status(400).json({
                error:"no user found in db"
            })
        }
        req.profile=user;
        next();
    });
};

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        { _id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false}).exec((err,user)=>{
            if(err || !user)
            {
                err:"no user Found";
            }
            res.json(user);
    });
}


//get all user
// exports.getAllUser=(req,res)=>{

//     User.find().exec((err,user)=>{
//         if(err || !user)
//         {
//             return res.status(400).json({
//                 err:"not found any user"
//             })
//         }
//         res.json(user)
//     })
// }




exports.getUser=(req,res)=>{
//get back here for password
req.profile.salt=undefined;
req.profile.encry_password=undefined; 
req.profile.createdAt=undefined;
req.profile.updatedAt=undefined;
    return res.json(req.profile)
};


exports.userPurchaseList=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                err:"No Order In this Account"
            })
        }
        res.json(order);
    })
}

//middleware
exports.pushOrderInPurchaseList=(req,res,next)=>{
  let purchases=[];
  req.body.order.products.forEach(product => {
      purchases.push({
          _id:product._id,
          name:product.name,
          description:product.description,
          category:product.category,
          quantity:product.quantity,
          amount:req.body.order.amount,
          transection_id:req.body.order.transection_id

      });
  });

  //strore in DB

  User.findOneAndUpdate({_id:req.profile._id},
    {$push:{purchases:purchases}},
    {new:true},(err,purchases)=>{
        if(err)
        {
            return res.status(400).json({
                err:"unable to save purchase list"
            });
        }
        next();
    });
    
}
 
