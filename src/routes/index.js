const { Router } = require("express");
const index = Router();

index.get("/", (req, res) => {
  res.render("index");
})

module.exports = index;
