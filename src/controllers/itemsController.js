const db = require("../db/query")
const {body, validationResult, matchedData} = require("express-validator")

const validateItem = [
  body("itemName").trim()
  .isLength({min: 4, max: 25}).withMessage("Item Name should be btn 3-25 letters").escape(),
  body("itemQuantity").trim()
  .isLength({min: 1, max: 999999999}).withMessage("Item quantity must be within the range of 1-9999999")
]

const getItemForm = (req, res) => {
  console.log(req);
  res.render("new", {
    title: "Add Item",
    type: "item",
    category: req.params.category
  })
}

const addItem = [
  validateItem,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).render("new", {
        title: "Error",
        errors: result.array(),
        type: "item"
      })
    }
    const category = req.params.category
    const {itemName, itemQuantity} = matchedData(req);
    
    await db.addItem({itemName, itemQuantity, category});
    res.redirect(`/${category}`)
  }
]


module.exports = {
  getItemForm,
  addItem
}
