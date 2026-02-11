const { Router } = require("express");
const index = Router()
const controllers = require('../controllers/rootControllers')

index.get("/", controllers.getAllCategories);

module.exports = index;