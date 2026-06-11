const express = require("express");
const app = express();
const mainRouter = require("./routes/generalRoute");
const path = require("path");

app.use(express.static(path.join(__dirname, "static")));
app.use("/pictures", express.static(path.join(__dirname, "pictures")));
app.set("view engine", "ejs");
app.use("/", mainRouter);
// Serve files from your 'pictures' directory

app.listen(8040, () => console.log("server ready"));
