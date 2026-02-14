require('dotenv').config()
const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
categoryname varchar(255) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Items(
itemId integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
itemName varchar(255),
itemQuantity integer,
category varchar(255) REFERENCES categories(categoryname)
);

INSERT INTO categories (categoryname) VALUES ('Manga'), ('Manhwa');
`

async function main() {
  const client = new Client({
    connectionString: process.env.DB_STRING,
    ssl: true 
  })

  try {
    await client.connect()
    await client.query(SQL)
    await client.end()
  } catch (err) {
    console.log("Error: ", err)
  }
}

main();
