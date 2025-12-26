const express = require('express');
const router = express.Router();
const { signup, login,sendForgotPasswordOTP, verifyOTP, resetPassword } = require('../controllers/authController');

router.post('/signup', signup); 
router.post('/login', login);
router.post("/sendopt",sendForgotPasswordOTP)
router.post("/verifyopt",verifyOTP)
router.put("/resetpass",resetPassword)
module.exports = router;
