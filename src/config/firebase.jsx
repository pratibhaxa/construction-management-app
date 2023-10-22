import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA-46PcmkSeWXNOkOh4TXzkJ98gWD9aErs",
  authDomain: "construction-management-b0b48.firebaseapp.com",
  projectId: "construction-management-b0b48",
  storageBucket: "construction-management-b0b48.appspot.com",
  messagingSenderId: "62950753522",
  appId: "1:62950753522:web:520c54dca68da51bd47c6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// for database
export const db = getFirestore(app);

getFirestore();

