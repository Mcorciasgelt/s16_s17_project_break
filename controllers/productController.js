// productController

const Product = require("../models/Product");
require("dotenv").config()

const BASE_URL = process.env.BASE_URL

const showProducts = async (req, res) => {
    try {
        const products = await Product.find().lean();
        if(products.length === 0) {
            return res.status(404).json({ message: "La lista de productos está vacía"})
        }

        products.forEach((element) => {
            element.detalle = `${BASE_URL}api/product/${element._id}`;
        })

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: "Error obteniendo la información de productos"})
    }
}

const showProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if(!product) {
            return res.status(404).json({ message: "Producto no encontrado"});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error buscando el producto"});
    }
}

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
    showProducts,
    showProductById,
}