const express = require("express");
const { dbConnection } = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const app = express();
const methodOverride = require('method-override');

require("dotenv").config();

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000

dbConnection();

app.use(express.static("public"));

app.use(express.json());

app.use(productRoutes);

app.get("/", (req, res) => {
    res.send("✅Server started")
});

app.listen(PORT, () => console.log(`✅Server started on port ${PORT}`));