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
  apiKey: ${this.props.apikey}
  authDomain: "taskproject-a31752.firebaseapp.com",
  projectId: "taskproject-a34172",
  storageBucket: "taskproject-a31472.appspot.com",
  messagingSenderId: "92176858763771",
  appId: "1:921768583771:web:dd3b8d0bd0b077129b14657e",
  measurementId: "G-GMBC49W543TB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFireStore()
export { auth, db };
