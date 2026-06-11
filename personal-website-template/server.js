const express = require("express");
const app = express();
const mainRouter = require("./routes/generalRoute");

app.set("view engine", "ejs");
app.use("/", mainRouter);

app.listen(3000, () => console.log("server ready"));
