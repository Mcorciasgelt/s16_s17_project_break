

// auth Controller

const { admin } = require("../config/firebase");

const firebase = require('firebase/auth');

/* import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';
 */
// Configuración de Firebase


/* const firebaseConfig = {
    apiKey: "AIzaSyA8SAK76S0ozyBCTNNAdXUHXLf1T5q1jLI",
    authDomain: "bootcamp-mct.firebaseapp.com",
    projectId: "bootcamp-mct",
    storageBucket: "bootcamp-mct.firebasestorage.app",
    messagingSenderId: "1079671424649",
    appId: "1:1079671424649:web:0547238f3ee0f7ad4ae858"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); */

/*

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
        <script type="module">
          // Importa las funciones necesarias desde Firebase SDK
          import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
          import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

          // Configuración de Firebase
          const firebaseConfig = {
            apiKey: "AIzaSyA8SAK76S0ozyBCTNNAdXUHXLf1T5q1jLI",
            authDomain: "bootcamp-mct.firebaseapp.com",
            projectId: "bootcamp-mct",
            storageBucket: "bootcamp-mct.firebasestorage.app",
            messagingSenderId: "1079671424649",
            appId: "1:1079671424649:web:0547238f3ee0f7ad4ae858"
          };

          // Inicializa Firebase
          const app = initializeApp(firebaseConfig);
          const auth = getAuth(app);

          console.log(app, auth)

          // Define la función login
          window.login = function() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log('loggin..g')

            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                return userCredential.user.getIdToken(); // Obtén el ID token
              })
              .then((idToken) => {
                // Envía el ID token al servidor
                console.log('ID token:', idToken);
                fetch('/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ idToken }),
                })
                .then(response => response.json())
                .then(data => {
                  if (data.success) {
                    window.location.href = '/api/dashboard'; // Redirige a dashboard
                  } else {
                    console.error('Login failed:', data.error);
                  }
                })
                .catch(error => {
                  console.error('Error:', error);
                });
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          };
        </script>

        <form>
            <input type="email" name="email" id="email" placeholder="Introduzca su Email"></input>
            <input type="password" name="password" id="password" placeholder="Introduzca su Password"></input>
            <button type="button" onClick="login()">Login</button>
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
    
    const { idToken } = req.body;
    try {
      // Verifica el ID token
      await admin.auth().verifyIdToken(idToken);
  
      // Guardar el ID token en una cookie
      res.cookie('token', idToken, { httpOnly: true, secure: false }); // Usa secure: true en producción. Es un atributo de los navegadores para las cookies y evitar XXS
      res.json({ success: true });
    } catch (error) {
      console.error('Error verifying ID token:', error);
      res.status(401).json({ error: 'Invalid token' });
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

*/