const { Router } = require("express");
const categories = Router();
const controller = require("../controllers/categoriesController");

categories.get("/", controller.getAllCategories);

categories.get("/add", controller.getCategoryForm);
categories.post("/add", controller.postCategoryForm);

categories.get("/:category", controller.getCategoryItems);
categories.get("/delete/:category", controller.deleteCategory);


module.exports = categories;
