const express = require("express")
const mongoose = require("mongoose");


const { Router, verfiyRoute, Findroute, authrouter, Airoute } = require("./routes/quizrouter");
let cors = require("cors")

let app = express();
require("dotenv").config()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/api/auth",authrouter)
app.use("/",Router)

app.use("/api",verfiyRoute)
app.use("/api",Findroute)
app.use("/api",Airoute)
app.get("/get",(req,res)=>{
  res.send("hello")
})

mongoose.connect(process.env.DBURL).then(()=>{
  console.log("connnected to mongoose");
  
   app.listen(process.env.PORT,()=>{
    console.log(`server is running on port http://localhost:${process.env.PORT}`);
    
   })
})

