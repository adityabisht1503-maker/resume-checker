const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");

const { Passwordmodel } = require("../model/Password");
const { sendVerificationEmail } = require("../service/nodemailer");

/* =========================
   UTILS
========================= */
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/* =========================
   SIGNUP
========================= */
const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({ status: 0, message: "Invalid email format" });
    }

    const existingUser = await Passwordmodel.findOne({ email });
    if (existingUser) {
      return res.json({ status: 0, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const user = new Passwordmodel({
      name,
      email,
      password: hashedPassword,
      otp: hashedOtp,
      otpExpiresAt: Date.now() + 10 * 60 * 1000,
      isVerified: false,
    });

    await user.save();
    await sendVerificationEmail(email, otp);

    return res.json({
      status: 1,
      message: "Verification email sent",
    });
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

/* =========================
   VERIFY OTP (SIGNUP / FORGOT)
========================= */


/* =========================
   LOGIN (FIXED)
========================= */
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Passwordmodel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        status: 0,
        message: "Please verify your email first",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        status: 0,
        message: "Incorrect password",
      });
    }
    // 🔥 PRO CHECK
    let proActive = false;
    if (user.Properiod) {
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      proActive = Date.now() < user.Properiod.getTime() + oneMonth;
    }

    if (!proActive) {
      user.plan = "Free";
      user.Properiod = null;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id },
      "secret123",
      { expiresIn: "1h" }
    );
    
    return res.json({
      status: 1,
      message: "Login successful",
      token,
       Plan: proActive ? "Pro" : "Free",
      user: {
        name: user.name,
        email: user.email,
        
      },
     
    });
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: "Server error",
    });
  }
};

/* =========================
   FIND EMAIL (FORGOT PASSWORD)
========================= */
const Find = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Passwordmodel.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: 0, message: "User not found" });
    }

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    user.isVerified = false;

    await user.save();
await sendVerificationEmail(email, otp);
    // TODO: send OTP via email
    console.log("📩 OTP:", otp);

    res.json({
      status: 1,
      message: "OTP sent to email",
    });
  } catch (err) {
    res.status(500).json({ status: 0, message: "Server error" });
  }
};



/* =========================
   RESET PASSWORD (SECURE)
========================= */
 const setPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Passwordmodel.findOne({ email });

    if (!user || !user.isVerified) {
      return res.status(403).json({
        status: 0,
        message: "OTP verification required",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.passwordChangedAt = new Date();
    user.isVerified = true;

    await user.save();

    res.json({
      status: 1,
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).json({ status: 0, message: "Server error" });
  }
};


const setPlan = async (req, res) => {
  try {
    const user = req.user; // ✅ FIX HERE

    if (!user || !user.Plan) {
      return res.status(400).send("Invalid user data");
    }

    if (user.Plan === "Pro") {
      return res.json({ plan: "Pro" });
    }

    return res.json({ plan: "free" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("error in plan");
  }
};

 

/* =========================
   EXPORTS
========================= */
module.exports = {
  Signup,
  Login,

  Find,
  setPassword,
  setPlan
};
