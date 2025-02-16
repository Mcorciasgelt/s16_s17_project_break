const express = require("express");
const { dbConnection } = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000

dbConnection();

app.use(express.json());

app.use(productRoutes);

app.get("/", (req, res) => {
    res.send("✅Server started")
});

app.listen(PORT, () => console.log(`✅Server started on port ${PORT}`));