const db = require("../db/query")
const { body, validationResult, matchedData } = require("express-validator")

const categoryValidation = [
  body('categoryName').trim()
  .isLength({min: 4, max: 200}).withMessage("Category name too short")
];

const getAllCategories = async (req, res) => {
  const result = await db.getAllCategories();
  
  res.render("index", {
    title: "Categories",
    categories: result
  });
}

const addCategory = [
  categoryValidation,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).render("new", {
        title: "Error",
        errors: result.array(),
        type: "category"
      })
    }

    const {categoryName} = matchedData(req);
    await db.addCategory(categoryName);
    res.redirect("/");
  }
]

const deleteCategory = async (req, res) => {
  const tgt = req.params.category;
  try {
  await db.deleteCategory(tgt);
  res.redirect("/")
  } catch (err) {
    console.log("Category Deletion Error", err.msg);
  }
}

const getCategoryItems = async (req, res) => {
  const tgt = db.fixString(req.params.category);
  try {
    const result = await db.fetchFromCategory(tgt);
    res.render("items", {
      title: tgt,
      items: result
    })
  } catch (err) {
    console.log("Error rendering category items", err.msg)
  }
}

const getCategoryForm = (req, res) => {
  res.render("new", {
    title: "Add new category",
    type: "category"
  })
}

module.exports = {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryItems,
  getCategoryForm
}
