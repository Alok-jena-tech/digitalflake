const fs = require("fs");
const path = require("path");
const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");
const Product = require("../models/Product");

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

    const subs = await Subcategory.find(filter)
      .populate("category")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: subs });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function create(req, res) {
  try {
    const { name, category: categoryId } = req.body;
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User id is requie" });
    }

    if (!name || name.trim() === "")
      return res.status(400).json({ success: false, message: "Name required" });

    if (!categoryId)
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });

    const category = await Category.find({ userId, _id: categoryId });

    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "Invalid category" });

    const data = { name: name.trim(), category: categoryId,userId };

    if (req.file) data.image = `/uploads/subcategories/${req.file.filename}`;

    const sub = await Subcategory.create(data);

    res
      .status(201)
      .json({ success: true, message: "Subcategory created", data: sub });
  } catch (err) {
    console.error(err);

    if (req.file) {
      removeFileIfExists(`/uploads/subcategories/${req.file.filename}`);
    }

    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function update(req, res) {
  try {
    const { userId } = req.user;

    const id = req.params.id;

    const { name, category, status } = req.body;

    const existing = await Subcategory.find({ userId, _id: id });

    if (!existing)
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found" });

    const update = {};

    if (name) update.name = name.trim();

    if (category) {
      const cat = await Category.find({userId,_id:category});

      if (!cat)
        return res
          .status(400)
          .json({ success: false, message: "Invalid category" });
      update.category = category;
    }
    if (status) update.status = status;

    if (req.file) update.image = `/uploads/subcategories/${req.file.filename}`;

    const updated = await Subcategory.findOneAndUpdate(
      { userId, _id: id },
      { $set: update, updatedAt: Date.now() },
      { new: true }
    );

    if (req.file && existing.image) removeFileIfExists(existing.image);

    res.json({ success: true, message: "Subcategory updated", data: updated });
  } catch (err) {
    console.error(err);

    if (req.file) {
      removeFileIfExists(`/uploads/subcategories/${req.file.filename}`);
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
    const existing = await Subcategory.find({ userId, _id: id });

    if (!existing)
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found" });

    const response = await Subcategory.findOneAndDelete({userId,_id:id});

    if (existing.image) removeFileIfExists(existing.image);

    if (response) {
      await Product.deleteMany({userId, subcategory: response._id });
    }

    res.json({ success: true, message: "Subcategory deleted" });
  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = { getAll, create, update, remove };
