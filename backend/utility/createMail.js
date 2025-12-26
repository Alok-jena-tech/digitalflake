const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
   const info= await transporter.sendMail({
      from: `"digital flake"<${process.env.EMAIL}`,
      to,
      subject,
      html,
    });
    return {
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    };
  } catch (err) {
    console.log("email err", err);
    
    return {
      success: false,
      message: "Failed to send email",
      error: err.message,
    };
  }
};
module.exports=sendEmail