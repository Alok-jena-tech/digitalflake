const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const mongoose = require("mongoose");

function removeFileIfExists(filePath) {
  if (!filePath) return;

  const p = path.join(__dirname, "..", filePath.replace(/^\/+/, ""));

  if (fs.existsSync(p)) {
    try {
      fs.unlinkSync(p);
    } catch (err) {
      console.warn("Failed to delete file", p, err);
    }
  }
}

async function getAll(req, res) {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User id is requie" });
    }

    const q = req.query.q;

    const filter = {};

    if (userId) filter.userId = userId;

    if (q) filter.name = { $regex: q, $options: "i" };
    // if (req.query.category) filter.category = req.query.category;
    // if (req.query.subcategory) filter.subcategory = req.query.subcategory;

    const products = await Product.find(filter)
      .populate("category")
      .populate("subcategory")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// async function getOne(req, res) {
//   try {
//     const prod = await Product.findById(req.params.id)
//       .populate("category")
//       .populate("subcategory");
//     if (!prod) return res.status(404).json({ message: "Product not found" });
//     res.json({ data: prod });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// }

async function create(req, res) {
  try {
    const { userId } = req.user;

    const { name, category: categoryId, subcategory: subcategoryId } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Name required" });
    }

    if (!categoryId)
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });

    if (
      !mongoose.Types.ObjectId.isValid(categoryId) ||
      !mongoose.Types.ObjectId.isValid(subcategoryId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Category ID" });
    }

    const category = await Category.find({ userId, _id: categoryId });

    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "Invalid category" });

    if (subcategoryId) {
      const sub = await Subcategory.findById({ userId, _id: subcategoryId });
      if (!sub)
        return res
          .status(400)
          .json({ success: false, message: "Invalid subcategory" });
    }

    const data = {
      name: name.trim(),
      category: categoryId,
      subcategory: subcategoryId,
      userId,
    };

    if (req.file) data.image = `/uploads/products/${req.file.filename}`;

    const prod = await Product.create(data);

    res
      .status(201)
      .json({ success: true, message: "Product created", data: prod });
  } catch (err) {
    console.error(err);

    if (req.file) {
      removeFileIfExists(`/uploads/products/${req.file.filename}`);
    }

    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const { userId } = req.user;

    const {
      name,
      category: categoryId,
      subcategory: subcategoryId,
      status,
    } = req.body;

    const existing = await Product.find({ userId, _id: id });

    if (!existing)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    const update = {};

    if (name) update.name = name.trim();

    if (categoryId) {
      const cat = await Category.find({ userId, _id: categoryId });

      if (!cat)
        return res
          .status(400)
          .json({ success: false, message: "Invalid category" });
      update.category = categoryId;
    }

    if (subcategoryId) {
      const sub = await Subcategory.find({ userId, _id: subcategoryId });

      if (!sub)
        return res
          .status(400)
          .json({ success: false, message: "Invalid subcategory" });
      update.subcategory = subcategoryId;
    }

    if (status) update.status = status;

    if (req.file) update.image = `/uploads/products/${req.file.filename}`;

    const updated = await Product.findOneAndUpdate(
      { userId, _id: id },
      { $set: update, updatedAt: Date.now() },
      { new: true }
    );

    if (req.file && existing.image) removeFileIfExists(existing.image);

    res.json({ success: true, message: "Product updated", data: updated });
  } catch (err) {
    console.error(err);

    if (req.file) {
      removeFileIfExists(`/uploads/products/${req.file.filename}`);
    }

    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function remove(req, res) {
  try {
    const { userId } = req.user;

    const { id } = req.params;

    if (!userId || !id) {
      return res
        .status(400)
        .json({ success: false, message: "User id is requie" });
    }

    const existing = await Product.find({ _id: id, userId });

    if (!existing)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    await Product.findByIdAndDelete(id);

    if (existing.image) removeFileIfExists(existing.image);

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function getSubCatByCat(req, res) {
  try {
    const {userId}=req.user;

    const { id } = req.params;
    
     if (!userId || !id) {
      return res
        .status(400)
        .json({ success: false, message: "User id is requie" });
    }

    const subCate = await Subcategory.find({userId, category: id }).lean();
    return res.status(200).json({
      success: true,
      data: subCate,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}
module.exports = { getAll, create, update, remove, getSubCatByCat };
