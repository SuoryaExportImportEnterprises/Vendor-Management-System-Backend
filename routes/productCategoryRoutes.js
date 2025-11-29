const express = require("express");
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/productCategoryController");

const router = express.Router();

router.get("/", getCategories);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
