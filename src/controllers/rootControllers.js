const db = require("../db/query")

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

async function formPost(req, res) {
  if (req.params.type == "category") {
    const categoryName = req.body.categoryName;
    await db.addCategory(categoryName);
    res.redirect("/");
  } else if (req.params.type == "item") {

  }
}

module.exports = {
  getAllCategories,
  getAddForm,
  formPost
}
