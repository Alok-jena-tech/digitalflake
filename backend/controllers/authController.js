const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail=require("../utility/createMail")
const SALT_ROUNDS = 10;

async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });

    const existing = await User.findOne({ email });

    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      name,
      email,
      password: hash,
      role: role || "admin",
    });
    res
      .status(201)
      .json({ success: true, message: "User created", userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);

    if (!ok)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const payload = { userId: user._id, role: user.role, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      message: "User login successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


const sendForgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ message: "user not found", success: false });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOTP = await bcrypt.hash(otp, 10);

    user.resetotpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    const emailResult=await sendEmail(
      email,
      "Password Reset OTP",
      `<h3>Your OTP is:${otp}</h3><p>valid for 10 minutes</p>`
    );

     if (!emailResult.success) {
    return res.status(500).json({
      success: false,
      message: "Unable to send OTP email",
    });
  }

  

    res.json({ message: "OTP send successfully", success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: `server error,${err}` });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.resetOTP) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

   
    if (user.resetotpExpiry && user.resetotpExpiry.getTime() < Date.now()) {

  return res.status(400).json({ success: false, message: "OTP expired" });
}

    const isValid = await bcrypt.compare(otp, user.resetOTP);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }

    res.json({ message: "Otp varified", success: true });
  } catch (err) {
    res.status(500).json({ message: err, success: false });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetOTP = undefined;
    user.resetotpExpiry = undefined;

    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err, success: false });
  }
};

module.exports = {
  signup,
  login,
  sendForgotPasswordOTP,
  resetPassword,
  verifyOTP,
};
