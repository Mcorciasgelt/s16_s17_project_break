// rutas endpoints de producto

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");


router.get("/api/products", productController.showProducts);
router.get("/api/product/:productId", productController.showProductById);
router.post("/api/dashboard", productController.createProduct);


module.exports = router;