require("dotenv").config();
const nodemailer = require("nodemailer");

const adminmail = async (req, res) => {
  try {
    const user = req.user;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: process.env.EMAIL, // admin receives it
      subject: "New transaction request",
      html: `
        <h2>New Payment Request</h2>
        <p><strong>User Email:</strong> ${user.email}</p>
        <p><strong>Transaction ID:</strong> ${user.transactionId}</p>
        <p>⏱️ Please verify payment and reply to user.</p>
      `,
    });

    return res.json({
      success: true,
      message:
        "Transaction received. Your plan will be activated after verification (within 24 hours).",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send admin email",
    });
  }
};

module.exports = { adminmail };
