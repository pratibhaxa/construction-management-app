import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB06VwvxfeZgZoogZSmK2GLdZpQr2hX3Kc",
  authDomain: "construction-management-app23.firebaseapp.com",
  projectId: "construction-management-app23",
  storageBucket: "construction-management-app23.appspot.com",
  messagingSenderId: "123061349967",
  appId: "1:123061349967:web:6b7947ba8dc1e9e2fec43a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// for database
export const db = getFirestore(app);

getFirestore();

