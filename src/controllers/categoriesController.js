const db = require("../db/query")

async function getAllCategories(req, res) {
  try {
    const results = await db.getAllCategories();
    res.render("categories", {
      title: "Categories",
      categories: results
    })
  } catch(err) {
    console.log("Error", err);
  }
}


module.exports = {
  getAllCategories
}
