// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyBebm9NkiRit9hf9j352AfP2E9IunAw4",
  authDomain: "missmister-9443b.firebaseapp.com",
  projectId: "missmister-9443b",
  storageBucket: "missmister-9443b.firebasestorage.app",
  messagingSenderId: "970858354962",
  appId: "1:970858354962:web:da6bc769197a0d583afbcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
