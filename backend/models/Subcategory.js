const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  name: { type: String, required: true, trim: true },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  
  image: { type: String, default: "" },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

subcategorySchema.index({ name: 1 });

module.exports = mongoose.model("Subcategory", subcategorySchema);
