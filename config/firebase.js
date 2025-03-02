// firebase
/* 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8SAK76S0ozyBCTNNAdXUHXLf1T5q1jLI",
  authDomain: "bootcamp-mct.firebaseapp.com",
  projectId: "bootcamp-mct",
  storageBucket: "bootcamp-mct.firebasestorage.app",
  messagingSenderId: "1079671424649",
  appId: "1:1079671424649:web:0547238f3ee0f7ad4ae858"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 */

const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount  = {
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
}

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

const firebaseConnection = async() => {
    try {
        console.log(serviceAccount);
        
        admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
        console.log("🚀Connected to the Firebase");
    } catch (error) {
        console.log("❌Imposible to conect the Firebase");
        throw new Error("There was an error connecting Firebase")        
    }
};

/* firebaseConnection(); */

module.exports = {admin, firebaseConnection};