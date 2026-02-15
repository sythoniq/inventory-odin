const path = require("node:path");
const express = require("express");
const app = express();

const index = require("./routes/index")
const categories = require("./routes/categories")
const items = require("./routes/items");

const assetsPath = path.join(__dirname, 'publics');
app.use(express.static(assetsPath));
app.use(express.urlencoded({extended:true}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use("/", index);
app.use("/categories", categories);
app.use("/items", items);

app.listen(3000, () => {
  console.log("Server listening on 3000")
})
