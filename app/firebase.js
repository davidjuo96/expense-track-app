// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrfxmZUG_vHvzOm4Sub5YqrZQ7T-wOn9Y",
  authDomain: "expense-track-app-a9c00.firebaseapp.com",
  projectId: "expense-track-app-a9c00",
  storageBucket: "expense-track-app-a9c00.appspot.com",
  messagingSenderId: "883667001098",
  appId: "1:883667001098:web:8fa3007ba637ef357ce4f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);