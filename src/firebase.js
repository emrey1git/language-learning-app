import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Veritabanı için gerekli
import { getAuth } from "firebase/auth";         // Giriş/Çıkış için gerekli

const firebaseConfig = {
  apiKey: "AIzaSyDsKPsbC5lotVXNMwR9Y5-DExI2IFzLJhE",
  authDomain: "languageapp-44be3.firebaseapp.com",
  databaseURL: "https://languageapp-44be3-default-rtdb.firebaseio.com",
  projectId: "languageapp-44be3",
  storageBucket: "languageapp-44be3.firebasestorage.app",
  messagingSenderId: "714436333020",
  appId: "1:714436333020:web:c46f2ab78c4c7a4b891319",
  measurementId: "G-Q51RBP9DXX"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Diğer dosyalardan ulaşabilmek için "export" (dışa aktar) yapıyoruz
export const db = getDatabase(app);
export const auth = getAuth(app);