// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Sua configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBCqcPK2VgsfTQgp1n_VBteKk3lXzo7F4k",
  authDomain: "embarque-app.firebaseapp.com",
  projectId: "embarque-app",
  storageBucket: "embarque-app.firebasestorage.app",
  messagingSenderId: "834511041840",
  appId: "1:834511041840:web:9435fc293a0714a12884f5",
  measurementId: "G-E60T4674TG",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa o Firestore e a Autenticação
const db = getFirestore(app);
const auth = getAuth(app);

// Exporta os serviços para uso em outras partes do seu app
export { db, auth };
