// productController

const Product = require("../models/Product");
require("dotenv").config()

//MENU DEL HTML
const getNav = (fromDashboard) => {
    
    let baseHtml = '';
    
    if(fromDashboard) {
        baseHtml +=
        `
        <head>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <nav>
                <a href="/api/dashboard">Productos</a>
                <a href="/api/dashboard/category/Camisetas">Camisetas</a>
                <a href="/api/dashboard/category/Pantalones">Pantalones</a>
                <a href="/api/dashboard/category/Zapatos">Zapatos</a>
                <a href="/api/dashboard/category/Accesorios">Accesorios</a>
                <a href="/api/dashboard/new">Nuevo Producto</a>
            </nav>
        `;
    }

    else {
        baseHtml += 
        `
        <head>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <nav>
                <a href="/api/products">Productos</a>
                <a href="/api/products/category/Camisetas">Camisetas</a>
                <a href="/api/products/category/Pantalones">Pantalones</a>
                <a href="/api/products/category/Zapatos">Zapatos</a>
                <a href="/api/products/category/Accesorios">Accesorios</a>
                <a href="/api/dashboard/">Dashboard</a>
            </nav>
        `;
    }
    return baseHtml
}
    

// FUNCIÓN TEMPLATE PARA PINTAR LAS CARDS DE PRODUCTOS
const getProductCards = (products, fromDashboard) => {
    let html = '<div class="product-grid">';
    for (let product of products) {
        html += `
            <div class="product-card">
                <img src="${product.Imagen}" alt="${product.Nombre}">
                <h2>${product.Nombre}</h2>
                <p>${product.Descripcion}</p>
                <p>${product.Precio}€</p>
            `
            
            if (fromDashboard) {
            html += `
                <a href="/api/dashboard/${product._id}">Administrar Producto</a>
            `
            }

            else {
            html += `
                <a href="/api/product/${product._id}">Detalle Producto</a>
            `
            }

            html += `
            </div>
            `;
    }
    html += 
        `
        </div>
        `;
    
    return html;
};

// FUNCIÓN TEMPLATE PARA PINTAR LAS CARD DE PRODUCTO POR ID
const getProductCardId = (product   , fromDashboard) => {
    let html = '';

        html += `
            <div class="product-card">
                <img src="${product.Imagen}" alt="${product.Nombre}">
                <h2>${product.Nombre}</h2>
                <p>${product.Descripcion}</p>
                <p>${product.Precio}€</p>
            `
            
            if (fromDashboard) {
            html += `
                    
                    <div class="product-actions">

                        <form action="/api/dashboard/${product._id}/edit" method="GET" class="action-form">
                            <button type="submit" class="action-btn">Editar</button>
                        </form>

                        <form action="/api/dashboard/${product._id}/delete" method="POST">
                            <input type="hidden" name="_method" value="DELETE">
                            <button type="submit" class="action-btn">Eliminar</button>
                        </form>

                    </div>
            `
            }

            html += `
            </div>
            `;
    
    return html;
};


const showProducts = async (req, res) => {
    
    const fromDashboard = req.originalUrl.includes('/api/dashboard');

    try {
        const products = await Product.find().lean();
        if(products.length === 0) {
            return res.status(404).json({ message: "La lista de productos está vacía"})
        }

        const productCard = getProductCards(products, fromDashboard);
        const baseHtml = getNav(fromDashboard);
        res.send(baseHtml + productCard);

    } catch (error) {
        res.status(500).json({ message: "Error obteniendo la información de productos"})
    }
}

const showProductById = async (req, res) => {
    
    const productId = req.params.productId;
    const fromDashboard = req.originalUrl.includes('/api/dashboard');
    
    try {
        const product = await Product.findById(productId);

        if(!product) {
            return res.status(404).json({ message: "Producto no encontrado"});
        }
        const productCardId = getProductCardId(product, fromDashboard);
        const baseHtml = getNav(fromDashboard);
        res.send(baseHtml + productCardId);
    } catch (error) {
        res.status(500).json({ message: "Error buscando el producto"});
    }
}

const showProductsByCategory = async (req, res) => {
    
    const category = req.params.category;
    const fromDashboard = req.originalUrl.includes('/api/dashboard');
    
    try {
        const products = await Product.find({ Categoria: category }).lean();

        if(!products) {
            return res.status(404).json({ message: "Categoría sin productos"});
        }
        const productCardsCategory = getProductCards(products, fromDashboard);
        const baseHtml = getNav(fromDashboard);
        res.send(baseHtml + productCardsCategory);
    } catch (error) {
        res.status(500).json({ message: "Error buscando la categoría"});
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
    
    const fromDashboard = req.originalUrl.includes('/api/dashboard');
    const baseHtml = getNav(fromDashboard);

    res.send(baseHtml + baseForm)

}

const showEditProduct = async (req, res) => {

    const fromDashboard = req.originalUrl.includes('/api/dashboard');
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
    
    const baseHtml = getNav(fromDashboard);
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
        res.status(202).redirect("/api/dashboard");

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
        
        const productId = newProduct._id;

        res.status(201).redirect(`/api/dashboard/${productId}`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const showDashboard = async (req, res) => {
    
    const fromDashboard = req.originalUrl.includes('/api/dashboard');    
    
    try {
        const products = await Product.find().lean();
        const productCards = getProductCards(products, fromDashboard);
        const baseHtml = getNav(fromDashboard);  
    
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

const deleteProduct = async (req, res) => {
    
    const productId = req.params.productId;

    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }
        res.status(200).redirect("/api/dashboard");

    } catch (error) {
        res.status(500).send("Error al intentar actualizar el producto")
    }
}


module.exports = { 
    createProduct,
    showProducts,
    showProductById,
    showProductsByCategory,
    showDashboard,
    showNewProduct,
    showEditProduct,
    updateProduct,
    showProductDetails,
    deleteProduct,
    getNav,
}