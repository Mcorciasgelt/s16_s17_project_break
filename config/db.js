// db.js - configuración de la base de datos

const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI


const dbConnection = async() => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("🚀Connected to the DataBase");
    } catch (error) {
        console.log("❌Imposible to conect the Data Base");
        throw new Error("There was an error connecting the Data Base")        
    }
};

module.exports = { dbConnection }