require("dotenv").config();
// FIREBASE const cookieParser = require('cookie-parser');
const express = require("express");
const { dbConnection } = require("./config/db");
/* const {firebaseConnection} = require("./config/firebase"); */
const productRoutes = require("./routes/productRoutes");
// FIREBASE const authRoutes =  require("./routes/authRoutes");
const app = express();
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

// FIREBASE app.use(cookieParser());

const PORT = process.env.PORT || 3000

dbConnection();
/* firebaseConnection(); */

app.use(express.static("public"));

app.use(express.json());

app.use(productRoutes);
// FIREBASE app.use(authRoutes);

app.get("/", (req, res) => {
    res.send("✅Server started")
});

app.listen(PORT, () => console.log(`✅Server started on port ${PORT}`));