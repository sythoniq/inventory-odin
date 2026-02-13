const { Router } = require("express");
const index = Router()

const categories = require("../controllers/categoriesController")
const items = require("../controllers/itemsController")

index.get("/favicon.ico", (res, req) => {
  return 'What a weird thing to do -_-'
})
index.get("/", categories.getAllCategories);
index.get("/:category", categories.getCategoryItems);
index.get("/delete/:category", categories.deleteCategory);

index.get("/category/new", categories.getCategoryForm);
index.post("/category/new", categories.addCategory)

index.get("/item/new/:category", items.getItemForm);
index.post("/item/new/:category", items.addItem);


module.exports = index;
