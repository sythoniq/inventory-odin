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

}

const getCategoryItems = async (req, res) => {

}

const getCategoryForm = (req, res) => {

}

module.exports = {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryItems,
  getCategoryForm
}
