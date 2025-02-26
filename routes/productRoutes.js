// rutas endpoints de producto

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");


router.get("/api/products", productController.showProducts);
router.get("/api/product/:productId", productController.showProductById);

router.get("/api/dashboard/new", (req, res) => {
    res.send(`
        <h1>Crear Nuevo Producto</h1>
        <form action="/api/dashboard" method="POST">
            <label for="Nombre">Nombre:</label>
            <input type="text" id="Nombre" name="Nombre" required><br>

            <label for="Descripcion">Descripción:</label>
            <textarea id="Descripcion" name="Descripcion" required></textarea><br>

            <label for="Imagen">Imagen URL:</label>
            <input type="text" id="Imagen" name="Imagen"><br>

            <label for="Categoria">Categoría:</label>
            <select id="Categoria" name="Categoria" required>
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select><br>

            <label for="Talla">Talla:</label>
            <select id="Talla" name="Talla" required>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select><br>

            <label for="Precio">Precio:</label>
            <input type="number" id="Precio" name="Precio" required><br>

            <button type="submit">Crear Producto</button>
        </form>
        `)
})

router.post("/api/dashboard", productController.createProduct);

router.get("/api/dashboard", productController.showDashboard);


module.exports = router;