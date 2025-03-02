// auth Controller

const { admin } = require("../config/firebase");

const firebase = require('firebase/auth');


/* const firebaseConfig = {
    apiKey: "AIzaSyA8SAK76S0ozyBCTNNAdXUHXLf1T5q1jLI",
    authDomain: "bootcamp-mct.firebaseapp.com",
    projectId: "bootcamp-mct",
    storageBucket: "bootcamp-mct.firebasestorage.app",
    messagingSenderId: "1079671424649",
    appId: "1:1079671424649:web:0547238f3ee0f7ad4ae858"
};

admin.initializeApp(firebaseConfig); */

/* const auth = firebase.getAuth(app); */


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
    
    const { email, password } = req.body;
    
    try {
        // Iniciar sesión en Firebase
        const auth = firebase.getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Obtener el token del usuario autenticado
        const idToken = await userCredential.user.getIdToken();

        // Guardar el token en una cookie
        res.cookie('token', idToken, {
            httpOnly: true,    // Para evitar acceso desde JavaScript
            secure: process.env.NODE_ENV === 'production', // Solo en HTTPS si está en producción
            maxAge: 3600000,   // Duración de 1 hora (ajusta como necesites)
        });

        // Redirigir al dashboard
        res.redirect('/api/dashboard');
    } catch (error) {
        // Manejo de errores
        res.status(400).json({ error: error.message });
    }
};

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