require('dotenv').config()
const { Client } = require("pg")

const SQL = `
    CREATE TABLE IF NOT EXIST Categories (
        categoryName varchar(255) PRIMARY KEY
    );
    CREATE TABLE IF NOT EXIST Items(
        itemId INTEGER PRIMARY KEY,
        itemName varchar(255),
        itemQuantity INTEGET,
        FOREIGN KEY(categoryName) REFERENCES Categories(categoryName)
    );
`

async function main() {
    const client = new Client({
        connectionString: process.env.DB_STRING,
        ssl: true
    })

    try {
        client.connect()
        client.query(SQL)
        client.end()
    } catch (err) {
        console.log("Error: ", err.msg)
    }
}

main();