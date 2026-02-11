const path = require("node:path");
const express = require("express");
const app = express();
const index = require("./routes/rootRoute.js")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "/publics");
app.use(express.static(assetsPath))

app.use(express.urlencoded({extended:true}));
app.use("/", index);
