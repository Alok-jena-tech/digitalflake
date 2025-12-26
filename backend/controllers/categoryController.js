const fs = require("fs");
const path = require("path");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Subcategory = require("../models/Subcategory");

function removeFileIfExists(filePath) {
  if (!filePath) return;

  const p = path.join(__dirname, "..", filePath.replace(/^\/+/, ""));

  if (fs.existsSync(p)) {
    try {
      fs.unlinkSync(p);
    } catch (err) {
      console.log("Failed to delete file", p, err);
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

    const categories = await Category.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, data: categories });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: "Server error" });
  }
}


async function create(req, res) {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User id is requie" });
    }

    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Name required" });
    }
    const data = { name: name.trim(), userId };

    if (req.file) data.image = `/uploads/categories/${req.file.filename}`;

    const category = await Category.create(data);

    res
      .status(201)
      .json({ success: true, message: "Category created", data: category });
  } catch (err) {
    if (req.file) {
      removeFileIfExists(`/uploads/categories/${req.file.filename}`);
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function update(req, res) {
  try {
    const { userId } = req.user;

    const { name, status } = req.body;

    const id = req.params.id;

    if (!userId || !id) {
      return res
        .status(400)
        .json({ success: false, message: "User id is requie" });
    }

    const update = {};

    if (name) update.name = name.trim();

    if (status) update.status = status;

    if (req.file) update.image = `/uploads/categories/${req.file.filename}`;

    const existing = await Category.find({ userId, _id: id });

    if (!existing)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    const updated = await Category.findOneAndUpdate(
      { _id: id, userId },
      { $set: update, updatedAt: Date.now() },
      { new: true }
    );

    if (!updated) {
      return res
        .status(400)
        .json({ message: "category could not update", success: false });
    }

    // if new image uploaded, delete old
    if (req.file && existing.image) removeFileIfExists(existing.image);

    res.json({ success: true, message: "Category updated", data: updated });
  } catch (err) {
    console.error(err);

    if (req.file) {
      removeFileIfExists(`/uploads/categories/${req.file.filename}`);
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
    const existing = await Category.find({ userId, _id: id });

    if (!existing)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    const response = await Category.findOneAndDelete({ userId, _id: id });

    // delete image file if exists
    if (response.image) removeFileIfExists(response.image);

    if (response) {
      await Subcategory.deleteMany({ userId, category: response._id });
      await Product.deleteMany({ userId, category: response._id });
    }

    res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = { getAll, create, update, remove };
