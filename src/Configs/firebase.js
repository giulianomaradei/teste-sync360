// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb6_sCXTjoqhxQqE5Nmb5klygfnbW6mlU",
  authDomain: "teste-sync360.firebaseapp.com",
  projectId: "teste-sync360",
  storageBucket: "teste-sync360.appspot.com",
  messagingSenderId: "370242059085",
  appId: "1:370242059085:web:b0b7662334a17db2b29504",
  databaseURL: "https://teste-sync360-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);