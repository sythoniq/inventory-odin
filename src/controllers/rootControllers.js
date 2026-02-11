const db = require("../db/query")
const { body, validationResult, matchedData } = require("express-validator")

const formValidation = [
 body("categoryName").trim()
  .isLength({min: 4, max: 200}).withMessage("Category name too short").escape(),
]

const getAllCategories = async (req, res) => {
  const result = await db.getAllCategories();
  res.render("index", {
    title: "Categories",
    categories: result
  })
}

function getAddForm(req, res) {
  if (req.params.type == "category") {
    res.render("new", {
      title: "Add Category",
      type: "category"
    })
  } else if (req.params.type == "item") {
    res.render("new", {
      title: "Add Item",
      type: "item"
    })
  }
}

const formPost = [
  formValidation, 
  async (req, res) => {
    if (req.params.type == "category") {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).render("new", {
          title: "Input Error",
          errors: result.array(),
          type: "category"
        })
      }
      const {categoryName} = matchedData(req);
      await db.addCategory(categoryName);
      res.redirect("/");
    } else if (req.params.type == "item") {

    }

  }
]

module.exports = {
  getAllCategories,
  getAddForm,
  formPost
}
