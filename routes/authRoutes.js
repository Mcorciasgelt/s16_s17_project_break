/* 
// rutas y endpoints de autentificación

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


// RUTAS DE LOGIN
router.get("/login", authController.loginForm );
router.post("/login", authController.login)

// RUTAS DE REGISTRO
router.get("/register", authController.registerForm );
router.post("/register", authController.register)

module.exports = router; 
*/