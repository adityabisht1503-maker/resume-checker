const mongoose = require("mongoose")

const passwordschema = mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // No duplicate emails
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: { type: Boolean, default: false },
  // verificationToken: String
  otp: String,
  otpExpiresAt: Date,
   passwordChangedAt: Date,
   // Usage limiting
    analysisCount: {
      type: Number,
      default: 0
    },

    lastResetDate: {
      type: Date,
      default: Date.now
    },
    Plan:{
         type:String,
         default:"free",
    },
    transactionId: {
    type: String,   // ✅ MUST be string
    default: null
  },
  Properiod:{
    type: Date,
      default: null
  }

   
}, { timestamps: true });

const Passwordmodel = mongoose.model("Login",passwordschema)

module.exports={Passwordmodel}
