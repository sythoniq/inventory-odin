const { Router } = require("express");
const categories = Router();
const controller = require("../controllers/categoriesController");

categories.get("/", controller.getAllCategories);


module.exports = categories;
