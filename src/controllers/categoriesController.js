const db = require("../db/query")
const {body, validationResult, matchedData} = require("express-validator")

const validateCategory = [
  body("categoryName").trim()
    .isLength({min: 5, max: 50}).withMessage("Category Name should be between 5-50")
]

async function getAllCategories(req, res) {
  try {
    const results = await db.getAllCategories();
    res.render("categories", {
      title: "Categories",
      categories: results
    })
  } catch(err) {
    console.error(err);
  }
}

async function getCategoryItems(req, res) {
  try {
    const results = await db.getCategoryItems(req.params.category);
    res.render("category", {
      title: req.params.category,
      items: results
    })
  } catch(err) {
    console.error(err)
  }
}

async function deleteCategory(req, res) {
  try {
    await db.deleteCategory(req.params.category);
    res.redirect("/categories")
  } catch(err) {
    console.error(err) 
  }
}

function getCategoryForm(req, res) {
  res.render("categoryAdd", {
    title: "Add Category"
  })
}

const postCategoryForm = [
  validateCategory,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).render("categoryAdd", {
        title: "Error",
        errors: result.array()
      })
    }

    const { categoryName } = matchedData(req);
    await db.addToCategory(categoryName);
    res.redirect("/categories");
  }
]


module.exports = {
  getAllCategories,
  getCategoryItems,
  deleteCategory,
  getCategoryForm,
  postCategoryForm
}
