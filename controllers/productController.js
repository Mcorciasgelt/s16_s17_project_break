// productController

const Product = require("../models/Product");

const createProduct = async (req, res) => {

    const { Nombre, Descripcion, Imagen, Categoria, Talla, Precio } = req.body;

    try {
        const newProduct = new Product({
            Nombre,
            Descripcion,
            Imagen,
            Categoria,
            Talla,
            Precio
        })
        await newProduct.save();
        res.status(201).json({ message: "Producto creado exitosamente", product: newProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = { 
    createProduct,
}