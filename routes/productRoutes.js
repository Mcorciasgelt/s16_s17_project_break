// rutas endpoints de producto

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middlewares/authMiddleware");


// RUTAS PRODUCT
router.get("/api/products", productController.showProducts);
router.get("/api/product/:productId", productController.showProductById);

router.get("/api/products/category/:category", productController.showProductsByCategory);


// RUTAS DASHBOARD
router.get("/api/dashboard/new", verifyToken, productController.showNewProduct);

router.post("/api/dashboard", verifyToken, productController.createProduct);

router.get("/api/dashboard", verifyToken, productController.showDashboard);

router.get("/api/dashboard/:productId/edit", verifyToken, productController.showEditProduct);

router.post("/api/dashboard/:productId", verifyToken,productController.updateProduct);

router.get("/api/dashboard/:productId", verifyToken, productController.showProductById);

router.get("/api/dashboard/category/:category", verifyToken, productController.showProductsByCategory);

router.post("/api/dashboard/:productId/delete", verifyToken, productController.deleteProduct);


module.exports = router;