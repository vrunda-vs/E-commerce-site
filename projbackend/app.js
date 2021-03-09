require("dotenv").config();


const mongoose=require("mongoose");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cookieparser=require("cookie-parser");
const cors=require("cors");


//routes
const authRoute=require("./routes/auth");
const userRoute=require("./routes/user");
const categoryroute=require("./routes/category");
const productRoute=require("./routes/product");
const orderRoute=require("./routes/order");
const stripeRoute=require("./routes/stripepayment")


//conncet to the database 
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED")
});
//this my middleware
app.use(bodyParser.json({limit:'50mb',extended:true}));
app.use(cookieparser());
app.use(cors());


//Routers

app.use("/api",authRoute);
app.use("/api",userRoute);
app.use("/api",categoryroute);
app.use("/api",productRoute);
app.use("/api",orderRoute);
app.use("/api",stripeRoute);



//PORT

const port=process.env.PORT ||4000;


app.listen(port,()=>
{
    console.log(`server is running at port number: ${port}`);
})