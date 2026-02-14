const { Router } = require("express");
const items = Router();

items.get("/items", (req, res) => {
  console.log("WIP");
})

module.exports = items;
