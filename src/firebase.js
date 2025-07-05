// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Optional: import analytics if you really want
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXE-nxcbyAIrkbbSERRtzojTn3ODctRic",
  authDomain: "hostel-mess-menu.firebaseapp.com",
  projectId: "hostel-mess-menu",
  storageBucket: "hostel-mess-menu.firebasestorage.app",
  messagingSenderId: "660943841079",
  appId: "1:660943841079:web:a19d0dd093cda71a33dcb2",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // optional

// ✅ This is what your App.jsx expects
export const db = getFirestore(app);
