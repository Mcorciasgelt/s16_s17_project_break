// rutas endpoints de producto

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");


router.get("/api/products", productController.showProducts);
router.get("/api/product/:productId", productController.showProductById);

router.get("/api/dashboard/new", productController.showNewProduct);

router.post("/api/dashboard", productController.createProduct);

router.get("/api/dashboard", productController.showDashboard);

router.get("/api/:productId/edit", productController.showEditProduct);

router.post("/api/dashboard/:productId", productController.updateProduct);

router.get("/api/dashboard/:productId", productController.showProductDetails);


module.exports = router;