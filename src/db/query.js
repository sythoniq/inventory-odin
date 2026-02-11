const pool = require("./pool")

async function getCategories() {
    try {
        await pool.query(`
            SELECT * FROM categories; 
            `)
    } catch (err) {
        console.log("Error: ", err.msg);
    }
}