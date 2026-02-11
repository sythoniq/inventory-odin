const { Router } = require("express");
const index = Router()
const controller = require('../controllers/rootControllers')

index.get("/", controller.getAllCategories);
index.get("/new/:type", controller.getAddForm)

index.post("/new/:type", controller.formPost)

module.exports = index;
