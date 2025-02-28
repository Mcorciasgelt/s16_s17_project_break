// rutas endpoints de producto

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");


// RUTAS PRODUCT
router.get("/api/products", productController.showProducts);
router.get("/api/product/:productId", productController.showProductById);

router.get("/api/products/category/:category", productController.showProductsByCategory);


// RUTAS DASHBOARD
router.get("/api/dashboard/new", productController.showNewProduct);

router.post("/api/dashboard", productController.createProduct);

router.get("/api/dashboard", productController.showDashboard);

router.get("/api/dashboard/:productId/edit", productController.showEditProduct);

router.post("/api/dashboard/:productId", productController.updateProduct);

router.get("/api/dashboard/:productId", productController.showProductById);

router.get("/api/dashboard/category/:category", productController.showProductsByCategory);

router.post("/api/dashboard/:productId/delete", productController.deleteProduct);


module.exports = router;