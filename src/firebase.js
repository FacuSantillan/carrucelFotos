import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCCGfu9HtTrYdHppTONKkAi5aWLoCcc0L8",
    authDomain: "carrusel-imagenes.firebaseapp.com",
    projectId: "carrusel-imagenes",
    storageBucket: "carrusel-imagenes.appspot.com",
    messagingSenderId: "18900858134",
    appId: "1:18900858134:web:1164ca509a4d28034e4c37",
    measurementId: "G-GJY5DFSGVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
