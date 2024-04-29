import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDW7FPTIulaL3R6LKjXh7AJo74mkVgM8ck",
  authDomain: "mini-project-d0e15.firebaseapp.com",
  projectId: "mini-project-d0e15",
  storageBucket: "mini-project-d0e15.appspot.com",
  messagingSenderId: "74635708002",
  appId: "1:74635708002:web:e53f306c9b957a6d29733b",
  measurementId: "G-DZHKVH8PBB"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();

