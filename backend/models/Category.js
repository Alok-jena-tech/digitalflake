const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  name: { type: String, required: true, trim: true },

  image: { type: String, default: "" },

  status: { type: String, enum: ["active", "inactive"], default: "active" },

  createdAt: { type: Date, default: Date.now },
  
  updatedAt: { type: Date, default: Date.now },
});

categorySchema.index({ name: 1 });

module.exports = mongoose.model("Category", categorySchema);
