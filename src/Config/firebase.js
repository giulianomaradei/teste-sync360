import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDb6_sCXTjoqhxQqE5Nmb5klygfnbW6mlU",
  authDomain: "teste-sync360.firebaseapp.com",
  databaseURL: "https://teste-sync360-default-rtdb.firebaseio.com",
  projectId: "teste-sync360",
  storageBucket: "teste-sync360.appspot.com",
  messagingSenderId: "370242059085",
  appId: "1:370242059085:web:b0b7662334a17db2b29504"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
export const storage = getStorage(app);

