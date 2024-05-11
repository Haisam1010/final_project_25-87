import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeBBD4XWfAJSelLCoZDOJgrFIq4xRMxtA",
  authDomain: "viper-8041c.firebaseapp.com",
  projectId: "viper-8041c",
  storageBucket: "viper-8041c.appspot.com",
  messagingSenderId: "40528368019",
  appId: "1:40528368019:web:ff30df252ce1f289035866",
  measurementId: "G-87WN640047"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
