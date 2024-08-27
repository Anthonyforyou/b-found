// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);