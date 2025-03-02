// auth Controller

const { admin } = require("../config/firebase");

const loginForm = async (req, res) => {
        
        const baseHtml = `
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

        const formLogin = 
        `
        <form action="/login" method="POST">
            <input type="email" name="email" id="email" placeholder="Introduzca su Email"></input>
            <input type="password" name="password" id="password" placeholder="Introduzca su Password"></input>
            <button type="submit">Login</button>
        </form>
        `;
        
        res.send(baseHtml + formLogin);

}

const registerForm = async (req, res) => {
        
    const baseHtml = `
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

    const formLogin = 
    `
    <form action="/register" method="POST">
        <input type="email" name="email" id="email" placeholder="Introduzca su Email"></input>
        <input type="password" name="password" id="password" placeholder="Introduzca su Password"></input>
        <button type="submit">Register</button>
    </form>
    `;
    
    res.send(baseHtml + formLogin);

}


const login = async (req, res) => {
    


}

const register = async (req, res) => {
    
    const { email, password } = req.body;

    try {
    const userRecord = await admin.auth().createUser({
        email,
        password,
        emailVerified: false,
        disabled: false,
    });

    res.json({ message: "Usuario registrado", userId: userRecord.uid });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }

}


module.exports = {
    loginForm,
    login,
    registerForm,
    register,
}