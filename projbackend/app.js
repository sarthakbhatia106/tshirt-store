require('dotenv').config()


const mongoose = require('mongoose');
const express= require('express');
const app= express();
const bodyParser= require("body-parser");
const cookieParser= require("cookie-parser");
const cors = require("cors");

//routes
const authRoutes= require("./routes/authentication")
const userRoutes= require("./routes/user")
const categoryRoutes= require("./routes/category");
const productRoutes= require("./routes/product");
const orderRoutes= require("./routes/order");
const stripeRoutes= require("./routes/stripepayment");



//DB connections
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true , 
    useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED")
}).catch(()=>{
    console.log("error in DB connection")
})

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//My routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",stripeRoutes);




//port
const port= process.env.PORT || 8000 ;
//Starting a server
app.listen(port,(req,res)=>{
    console.log(`app is running at ${port}`);
})

