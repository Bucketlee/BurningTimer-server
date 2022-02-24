const { Router } = require("express");

const { createCategory, deleteCategory, getCategories, updateCategory } = require("../controllers/index");

const router = Router();

router.post("/", createCategory);
router.delete("/:categoryId", deleteCategory);
router.get("/", getCategories);
router.put("/:categoryId", updateCategory);

module.exports = router;
