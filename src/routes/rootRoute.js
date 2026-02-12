const { Router } = require("express");
const index = Router()

const categories = require("../controllers/categoriesController")
const items = require("../controllers/itemsController")

index.get("/", categories.getAllCategories);
//index.get("/:category", categories.getCategoryItems);
index.get("/delete/:category", categories.deleteCategory);

index.get("/category/new", categories.getCategoryForm);
index.post("/category/new", categories.addCategory)


module.exports = index;
