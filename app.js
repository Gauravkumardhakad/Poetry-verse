const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const poemRoutes = require("./routes/poemRoutes");

dotenv.config();
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("DB Connection Error:", err));

app.use("/poems", poemRoutes);

app.get("/", (req, res) => res.redirect("/poems"));

app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`));
