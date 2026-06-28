const express = require("express")
const { model } = require("mongoose")
const { Signup, Login, Find, setPassword, sendOtp, setPlan } = require("../controller/authcontroller")

const {  verifyOtp } = require("../controller/verification")
const { Ai } = require("../controller/Geminicontoller")
const { analyzeResume } = require("../controller/Resumecontroller")
const upload = require("../middlewaer/multer")
const { Limitcontoller, Limitcontroller } = require("../middlewaer/Limitcontoller")
const { authMiddleware } = require("../middlewaer/authmiddlewear")
const { transaction } = require("../controller/transactioncontroller")
const { adminmail } = require("../service/adminmail")

let Router = express.Router()

let authrouter = express.Router()

let verfiyRoute = express.Router()
let Findroute = express.Router()
let Airoute = express.Router()

authrouter.post("/signup",Signup)
authrouter.post("/login",Login)

verfiyRoute.post('/auth/verify-otp',verifyOtp)
Findroute.post('/auth/findgmail',Find)
Findroute.post('/auth/reset-password',setPassword)
Airoute.post('/auth/Aiadd',Ai)
Airoute.post('/auth/Resume',authMiddleware,Limitcontroller,upload.single('resume') ,analyzeResume)
Airoute.post('/submit-transaction',authMiddleware,transaction,adminmail)
Airoute.post('/setPlan',authMiddleware,setPlan)
module.exports={authrouter,verfiyRoute,Findroute,Router,Airoute}