const pool = require("./pool")

async function getAllCategories() {
  try {
    const { rows } = await pool.query(`SELECT * FROM categories;`)
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function getAllItems() {}

module.exports = {
  getAllCategories,
  getAllItems
}
