require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const adminmail = async (req, res) => {
  try {
    const user = req.user;

    const { data, error } = await resend.emails.send({
      from: "Quiz Master <onboarding@resend.dev>", // Replace with your verified domain later
      to: process.env.EMAIL, // Admin email
      subject: "💳 New Transaction Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #e5e7eb; border-radius:10px; background:#ffffff;">

          <h2 style="color:#2563eb;">💳 New Payment Request</h2>

          <p>A new payment request has been submitted.</p>

          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding:8px; font-weight:bold;">📧 User Email</td>
              <td style="padding:8px;">${user.email}</td>
            </tr>

            <tr>
              <td style="padding:8px; font-weight:bold;">🧾 Transaction ID</td>
              <td style="padding:8px;">${user.transactionId}</td>
            </tr>
          </table>

          <br>

          <p>
            ⏱️ Please verify the payment and activate the user's plan.
          </p>

          <hr>

          <p style="font-size:13px; color:#666;">
            Quiz Master Payment System
          </p>

        </div>
      `,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.json({
      success: true,
      message:
        "Transaction received. Your plan will be activated after verification (within 24 hours).",
    });
  } catch (error) {
    console.error("Failed to send admin email:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send admin email",
    });
  }
};

module.exports = { adminmail };