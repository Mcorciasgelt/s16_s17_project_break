// Modelo de datos de Producto

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        Nombre: { type: String, required: true },
        Descripcion: { type: String, required: true },
        Imagen: { type: String },
        Categoria: {
            type: String,
            required: true,
            enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"],
        },
        Talla: {
            type: String,
            required: true,
            enum: ["XS", "S", "M", "L", "XL"],
        },
        Precio: { type: Number, required: true},
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;