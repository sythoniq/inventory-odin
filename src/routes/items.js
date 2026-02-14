const { Router } = require("express");
const items = Router();

const controller = require('../controllers/itemsController')

items.get("/", controller.getAllItems);

module.exports = items;
