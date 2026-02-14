const { Router } = require("express");
const items = Router();

const controller = require('../controllers/itemsController')

items.get("/", controller.getAllItems);
items.get("/new", controller.getItemForm);
items.post("/new", controller.addItem)

items.get("/delete/:id", controller.deleteItem)
items.get("/edit/:id", controller.editItem)
items.post("/edit/:id", controller.postEditItem);

module.exports = items;
