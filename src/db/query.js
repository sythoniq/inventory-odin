const pool = require("./pool")

// Category db queries
async function getAllCategories() {
  try {
  const { rows } = await pool.query(`SELECT * FROM categories;`)
  return rows;
  } catch (err) {
    console.log("Categories fetch error", err);
  }
}

async function addCategory(name) {
  try {
    await pool.query(`INSERT INTO categories VALUES ($1)`, [name]);
  } catch (err) {
    console.log("Insertion error", err);
  }
}

async function deleteCategory(name) {
  try {
    await pool.query(`DELETE FROM categories WHERE categoryname = ($1)`, [name]);
  } catch (err) {
    console.log("Error deleting from db", err);
  }
}

async function fetchFromCategory(name) {
  try {
    const { rows } = await pool.query(`SELECT * FROM items WHERE category = ($1)`, [name]);
    return rows;
  } catch (err) {
    console.log("Error selecting items from db", err);
  }
}


module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
  fetchFromCategory
}
