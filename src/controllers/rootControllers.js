const db = require("../db/query")

const getAllCategories = async (req, res) => {
    const result = await db.getAllCategories();
    res.render("index", {
        title: "Categories",
        categories: result
    })
}

module.exports = {
    getAllCategories
}