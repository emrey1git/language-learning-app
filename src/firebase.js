import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 
import { getAuth } from "firebase/auth";        

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

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);