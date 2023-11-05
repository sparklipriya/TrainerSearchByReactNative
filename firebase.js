// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFireStore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD133Znsc9DT-UwZ03aE6MZ7n6H2a_lQs",
  authDomain: "taskproject-a3172.firebaseapp.com",
  projectId: "taskproject-a3172",
  storageBucket: "taskproject-a3172.appspot.com",
  messagingSenderId: "921768583771",
  appId: "1:921768583771:web:dd3b8d0bd0b077129b157e",
  measurementId: "G-GMBC49W3TB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFireStore()
export { auth, db };