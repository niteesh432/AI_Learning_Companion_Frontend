// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyb_oomb07y55S0CcFRCApQflCHe6Yo6s",
  authDomain: "ai-learning-companion-bcf0e.firebaseapp.com",
  projectId: "ai-learning-companion-bcf0e",
  storageBucket: "ai-learning-companion-bcf0e.appspot.com",
  messagingSenderId: "584434549784",
  appId: "1:584434549784:web:a590adb3cb4afe1fcdef6d",
  measurementId: "G-KEPWT1HT53"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
