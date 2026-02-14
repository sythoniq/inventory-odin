const db = require('../db/query')
const {body, validationResult, matchedData} = require("express-validator")

const validateItem = [
  body("itemName").trim()
    .isLength({min: 3, max: 255}).withMessage("Item name range 3-255"),
  body("itemQuantity").trim()
    .isLength({min: 1, max: 999}).withMessage("Item quantity range 1-999"),
  body("category").trim()
]

async function getAllItems(req, res) {
  const result = await db.getAllItems();
  
  res.render("items", {
    title: "Items",
    items: result
  })
}

const addItem = [
  validateItem,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).render("items", {
        title: "Error",
        errors: result.array()
      })
    }
    let {itemName, itemQuantity, category} = matchedData(req);
    itemQuantity = Number(itemQuantity)
    await db.addItem({itemName, itemQuantity, category});
    res.redirect(`/categories/${category}`)
  }
]

async function getItemForm(req, res) {
  const result = await db.getAllCategories();
  res.render("itemAdd", {
    title: "Add Item",
    categories: result
  })
}

async function deleteItem(req, res) {
  const id = Number(req.params.id);
  try {
    await db.deleteItem(id);
    res.redirect("/")
  } catch (err) {
    console.error(err);
  }
}

async function editItem(req, res) {
  try {
    const categories = await db.getAllCategories();
    const item = await db.getItem(req.params.id);
    res.render("itemEdit", {
      title: "Edit Item",
      categories: categories,
      item: item[0]
    })
  } catch (err) {
    console.error(err)
  }
}

const postEditItem = [
  validateItem,
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(400).render("itemEdit", {
        title: "Input Error",
        errors: results.array()
      })
    }
    const {itemName, itemQuantity, category} = matchedData(req);
    const id = Number(req.params.id);
    await db.updateItem(id, {itemName, itemQuantity, category});
    res.redirect(`/categories/${category}`);
  }
]

module.exports = {
  getAllItems,
  addItem,
  getItemForm,
  deleteItem,
  editItem,
  postEditItem
}
