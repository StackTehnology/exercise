import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC5v12A2V008qkHr5BcNGWR53MfhKuTKxg",
  authDomain: "listofperson-c1090.firebaseapp.com",
  databaseURL: "https://listofperson-c1090-default-rtdb.firebaseio.com",
  projectId: "listofperson-c1090",
  storageBucket: "listofperson-c1090.appspot.com",
  messagingSenderId: "78961718556",
  appId: "1:78961718556:web:182d06a7ae3e95ab7236d9",
  measurementId: "G-0YHFC6DCL3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
