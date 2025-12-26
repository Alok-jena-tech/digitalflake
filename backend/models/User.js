const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: '' },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: function() { return !this.googleId; } },
  googleId: { type: String, unique: true, sparse: true },
  picture: { type: String, default: '' },
  role: { type: String, enum: ['admin', 'user'], default: 'admin' },
  resetOTP:String,
  resetotpExpiry:Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
