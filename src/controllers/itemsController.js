const db = require('../db/query')
const {body, validationResult, matchedData} = require("express-validator")

async function getAllItems(req, res) {
  const result = await db.getAllItems();
  
  res.render("items", {
    title: "Items",
    items: result
  })
}



module.exports = {
  getAllItems
}
