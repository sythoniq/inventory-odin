const pool = require("./pool")

async function getAllCategories() {
  try {
    const { rows }= await pool.query(`
SELECT * FROM Categories; 
`)
    console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function addCategory(name) {
  try {
    await pool.query(`INSERT INTO Categories (categoryname) VALUES ($1)`, [name])
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  getAllCategories,
  addCategory
}
