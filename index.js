const indexRouter = require("./routes/index");
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${3000}`));
