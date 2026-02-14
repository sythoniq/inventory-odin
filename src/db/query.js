const pool = require("./pool")

async function getAllCategories() {
  try {
    const { rows } = await pool.query(`SELECT * FROM categories;`)
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function getAllItems() {
  try {
  const { rows } = await pool.query (`SELECT * FROM items`);
  return rows;
  } catch (err) {
    console.error(err);
  }
}

async function getCategoryItems(category) {
  try {
    const { rows } = await pool.query(`SELECT * FROM items WHERE category=($1)`,
    [category]);
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function addToCategory(category) {
  try {
    await pool.query(`INSERT INTO categories (categoryname) VALUES ($1)`,
      [category]);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllCategories,
  getAllItems,
  getCategoryItems,
  addToCategory
}
