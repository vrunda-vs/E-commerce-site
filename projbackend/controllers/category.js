const Category=require("../models/category");
const {check,validationResult}=require("express-validator");
//middleware
exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                err:"category not found"
            })
        }
        req.category=category;
        next();
    })
}
//actuall routes

//create category||insert category 

exports.createCategory=(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(422).json({
            err:errors.array()[0].msg
        })
    }

    const category=new Category(req.body);
    category.save((err,category)=>{
        if(err)
        {
            return res.status(400).json({
                err:"category not saved into the database "
            });
        }
        res.json({category})
    });

};

exports.getCategory=(req,res)=>{
    return res.json(req.category)
   
}

exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err)
        {
            return res.status(400).json({
                err:"no category found"
            })
        }
        res.json(categories);
    })

}

exports.updateCategory=(req,res)=>{
    const category=req.category;
    category.name=req.body.name;
    category.save((err,updateCategory)=>{
        if(err)     
        {
            return res.status(400).json({
                err:"not updation done"
            })
        }
        res.json(updateCategory);

    })

    // Category.findByIdAndUpdate({_id:req.category._id},
    //     {$set:req.body},
    //     {new:true,useFindAndModify:false}).exec((err,category)=>{
    //         if(err)
    //         {
    //             return res.status(400).json({
    //                 err:"not updation done"
    //             })
    //         }
    //         res.json(category);
    //     })
}

exports.removeCategory=(req,res)=>{
    const category=req.category;
    category.remove((err,category)=>{
        if(err)
        {
            return res.status(400).json({
                err:"failed to delete this category"
            })
        }
        res.json({
            messege:"sucessfully delete"
        })
    })
}

