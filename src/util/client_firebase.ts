// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdjev6D21GLPvTt1q80hbiR6q6qTSwkJ4",
  authDomain: "komorebi-kagami.firebaseapp.com",
  projectId: "komorebi-kagami",
  storageBucket: "komorebi-kagami.appspot.com",
  messagingSenderId: "562891149699",
  appId: "1:562891149699:web:8f87d28b93ac4a4e6b66b6",
  measurementId: "G-JYVFG6VTS3",
};

// // Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app); // it should be in client context
export const db = getFirestore(app);
export const auth = getAuth();
