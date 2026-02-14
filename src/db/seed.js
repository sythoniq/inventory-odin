require('dotenv').config()
const { Client } = require("pg")

const SQL = `
DROP TABLE IF EXISTS categories, items;

CREATE TABLE IF NOT EXISTS categories (
categoryname varchar(255) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Items(
itemId integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
itemName varchar(255) UNIQUE,
itemQuantity integer,
category varchar(255) REFERENCES categories(categoryname)
);

INSERT INTO categories (categoryname) VALUES 
  ('Manga'), ('Manhwa'), ('Novels'), ('Electronics');


INSERT INTO items (itemname, itemquantity, category) VALUES 
  ('Vagabond', 2, 'Manga'),
  ('Berserk', 1, 'Manga'),
  ('The Beginning After The End', 1, 'Manhwa'),
  ('Pick Me Up', 1, 'Manhwa'),
  ('Shadow Slave', 1, 'Novels'),
  ('Reverend Insanity', 1, 'Novels'),
  ('Samsung A05', 1, 'Electronics'),
  ('Dell Latitude 7400', 1, 'Electronics');
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
