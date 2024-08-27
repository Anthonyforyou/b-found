// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Je Firebase-configuratie
const firebaseConfig = {
  apiKey: "AIzaSyBBzxWq0jiTDoajmjODyGAU2w_pyWeDMgc",
  authDomain: "dbrand-d66ca.firebaseapp.com",
  databaseURL: "https://dbrand-d66ca-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dbrand-d66ca",
  storageBucket: "dbrand-d66ca.appspot.com",
  messagingSenderId: "245035494162",
  appId: "1:245035494162:web:763e09c7ef41c95c4ce1cb",
  measurementId: "G-PC6DTS5HYP"
};

// Initialiseer Firebase
const app = initializeApp(firebaseConfig);

// Initialiseer Firestore
const database = getFirestore(app);

// Initialiseer Analytics alleen in de browseromgeving
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { database, analytics };
