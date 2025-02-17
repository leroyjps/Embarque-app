// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase corrigida
const firebaseConfig = {
  apiKey: "AIzaSyBCqcPK2VgsfTQgp1n_VBteKk3lXzo7F4k",
  authDomain: "embarque-app.firebaseapp.com",
  projectId: "embarque-app",
  storageBucket: "embarque-app.appspot.com", // Corrigido
  messagingSenderId: "834511041840",
  appId: "1:834511041840:web:9435fc293a0714a12884f5",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
