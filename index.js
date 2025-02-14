const express = require("express");
const { dbConnection } = require("./config/db");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000

dbConnection();

app.listen(PORT, () => console.log(`✅Server started on port ${PORT}`));