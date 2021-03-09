const Product=require("../models/product");
const formidable=require("formidable");
const _=require("lodash");
const fs=require("fs");

exports.getProductById=(req,res,next,id)=>{

    Product.findById(id).
    populate("category").
    exec((err,product)=>{
        if(err)
        {
            return res.status(400).json({
                err:"no product found"
            })
        }
        req.product=product;
        next();
    })

}

exports.createProduct=(req,res)=>{

    let form=new formidable.IncomingForm();
    form.keepExtension=true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                err:"problem with images"
            })
        }
       //destructure the field
       const {name,description,price,category,stock} = fields;
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                err:"please include all filed"
            })
        }


        //restrction on filed
        let product=new Product(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    err:"file size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType=file.photo.type;
        }
      
        //save to db
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    err:"saving tshirt in db fail"
                })
            }
            res.json(product)
        })
    })

}

exports.getAllProduct=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy=req.query.sortBy ? req.query.sortBy :  "_id"; 
  
    Product.find().
    //select("-photo").
    populate("category").
    sort([[sortBy,"asc"]]).
    limit(limit).
    exec((err,product)=>{
        if(err)
        {
            return res.status(400).json({
                err:"no record found"
            })
        }
        res.json(product);
    })
   
}

exports.getProduct=(req,res)=>{
   req.product.photo=undefined 
  // console.log(res.product); 
   return res.json(req.product);
}

//middel ware

exports.photo=(req,res,next)=>{
  if(req.product.photo.data)
  {
      res.set("content-type",req.product.photo.contentType)
      return res.send(req.product.photo.data)
  }
  next();
}

exports.deleteProduct=(req,res)=>{ 
    let product=req.product;
    product.remove((err,pro)=>{
        if(err)
        {
            return res.status(400).json({
                err:"product not deleted"
            })
        }
        res.json(({
            messege:"sucessfully deleted" 
        }))
    })
}
//update
exports.updateProduct=(req,res)=>{

    let form=new formidable.IncomingForm();
    form.keepExtension=true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                err:"problem with images"
            })
        }

        //updation code
        let product=req.product;
        product=_.extend(product,fields);
        

        //handle file here
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    err:"file size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType=file.photo.type;
            
        }
        console.log(product);
        //save to db
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    err:"updation of product  fail"
                })
            }
            res.json(product)
        })
    })

     
}

exports.updateStock=(req,res)=>{
    let myOprations=req.body.product.map(prod=>{
        return{
            updateOne:{
                filter:{_id:prod._id},
                update:{$inc:{stock:-prod.count, sold :+pro.count}}
            }
        }
    })
    product.bulkWrite(myOprations,{},(err,products)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Bulk opration failed"
            })
        }
        next();
    })
}

exports.getAllUniqueCategories=(req,res,next)=>{
    product.distinct("category",{},(err,categories)=>{
        if(err)
        {
            return res.status(400).json({
                err:"No Category found"
            })
        }
        res.json(categories);
    })
}