const ProductCategory = require("../models/ProductCategory");

const getCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find().sort({ optionValue: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to load categories" });
  }
};

const addCategory = async (req, res) => {
  try {
    const { optionValue } = req.body;

    const exists = await ProductCategory.findOne({ optionValue });
    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCat = await ProductCategory.create({ optionValue });
    res.json(newCat);
  } catch (err) {
    res.status(500).json({ message: "Failed to add category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionValue } = req.body;

    const updated = await ProductCategory.findByIdAndUpdate(
      id,
      { optionValue },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await ProductCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete category" });
  }
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
