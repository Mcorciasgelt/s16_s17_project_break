// productController

const Product = require("../models/Product");
require("dotenv").config()

const BASE_URL = process.env.BASE_URL

//BASE DEL HTML
const baseHtml = 
    `
    <head>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <nav>
            <a href="/api/dashboard">Dashboard</a>
            <a href="/api/dashboard/new">Nuevo Producto</a>
        </nav>
    `;

// FUNCIÓN TEMPLATE PARA PINTAR LAS CARDS DE PRODUCTOS
const getProductCards = (products) => {
    let html = '';
    for (let product of products) {
        html += `
            <div class="product-card">
                <img src="${product.Imagen}" alt="${product.Nombre}">
                <h2>${product.Nombre}</h2>
                <p>${product.Descripcion}</p>
                <p>${product.Precio}€</p>
                <a href="/api/dashboard/${product._id}">Ver detalle</a>
                <a href="/api/product/${product._id}">Ver detalle Producto</a>
                <a href="/api/dashboard/${product._id}/edit">Editar</a>
                <a href="/api/dashboard/${product._id}/delete">Eliminar</a>
            </div>
        `;
    }
    return html;
};


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

const baseForm = 
    `
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
    `

const showNewProduct = async (req, res) => {
    
    res.send(baseHtml + baseForm)

}

const showEditProduct = async (req, res) => {

    const productId = req.params.productId;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }

    const editForm = baseForm
        .replace('<form action="/api/dashboard" method="POST">', `<form action="/api/dashboard/${productId}" method="POST"> <input type="hidden" name="_method" value="PUT">`)
        .replace('Crear Producto', 'Editar Producto')
        .replace('id="Nombre"', `value="${product.Nombre}" id="Nombre"`)
        .replace('</textarea>', `${product.Descripcion}</textarea>`)
        .replace('id="Imagen"', `value="${product.Imagen}" id="Imagen"`)
        .replace(`<option value="${product.Categoria}">`, `<option value="${product.Categoria}" selected>`)
        .replace(`<option value="${product.Talla}">`, `<option value="${product.Talla}" selected>`)
        .replace('id="Precio"', `value="${product.Precio}" id="Precio"`);
    
    res.send(baseHtml + editForm)
    } catch (error) {
        res.status(500).send("Error al cargar los datos del producto para editar")
    }
}

const updateProduct = async (req, res) => {

    const productId = req.params.productId;

    const { Nombre, Descripcion, Imagen, Categoria, Talla, Precio } = req.body;

    const datosActualizados = { Nombre, Descripcion, Imagen, Categoria, Talla, Precio };

    try {
        const product = await Product.findByIdAndUpdate(productId, datosActualizados, { new: true } );
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }
        res.status(202).json({ message: "Producto actualizado exitosamente", product: product });

    } catch (error) {
        res.status(500).send("Error al intentar actualizar el producto")
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

const showDashboard = async (req, res) => {
    try {
        const products = await Product.find().lean();
        const productCards = getProductCards(products);     
    
        res.send(baseHtml + productCards)

    } catch (error) {
        res.status(500).send("Error obteniendo los productos");
    }
};

const showProductDetails = async (req, res) => {

    const productId = req.params.productId;
    const products = [];

    try {
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).send("Producto no encontrado");
        }

        products.push(product);
        const productCard = getProductCards(products);
             
    
        res.send(baseHtml + productCard)
    } catch (error) {
        res.status(500).send("Error obteniendo detalles del producto");
    }

}


module.exports = { 
    createProduct,
    showProducts,
    showProductById,
    showDashboard,
    showNewProduct,
    showEditProduct,
    updateProduct,
    showProductDetails,
}