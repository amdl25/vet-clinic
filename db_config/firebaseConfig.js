import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgZeC8Xi23qzCCWxAxisYbfCGnEPRlO0k",
  authDomain: "clinicaveterinara-81e9b.firebaseapp.com",
  projectId: "clinicaveterinara-81e9b",
  storageBucket: "clinicaveterinara-81e9b.firebasestorage.app",
  messagingSenderId: "227527865475",
  appId: "1:227527865475:web:a26e5545b485709d58d7b6"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default {firebaseApp, db};