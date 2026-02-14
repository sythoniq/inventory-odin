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

async function getItem(id) {
  try {
    const { rows } = await pool.query("SELECT * FROM items WHERE itemId = ($1)",
    [id]);
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function addItem(item) {
  const {itemName, itemQuantity, category} = item;
  try {
    await pool.query(`INSERT INTO items (itemname, itemquantity, category)
VALUES ($1, $2, $3)`, [itemName, itemQuantity, category]);
  } catch (err) {
    console.error(err);
  }
}

async function deleteItem(itemId) {
  try {
    await pool.query(`DELETE FROM items WHERE itemId = ($1)`, [itemId]);
  } catch (err) {
    console.error(err);
  }
}

async function updateItem(id, item) {
  const {itemName, itemQuantity, category} = item;

  try {
    await pool.query(`UPDATE items SET itemName=($1), itemQuantity=($2),
category=($3) WHERE itemId=($4)`, [itemName, itemQuantity, category, id]);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllCategories,
  getAllItems,
  getCategoryItems,
  addToCategory,
  addItem,
  deleteItem,
  getItem,
  updateItem
}
