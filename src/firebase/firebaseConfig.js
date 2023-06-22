// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsEhtbRwQ79wUVoMGrbBVwOZ5yvirXmIM",
  authDomain: "mini-project-5efef.firebaseapp.com",
  projectId: "mini-project-5efef",
  storageBucket: "mini-project-5efef.appspot.com",
  messagingSenderId: "1046478066240",
  appId: "1:1046478066240:web:43c4901d914f43cfc905a5",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
