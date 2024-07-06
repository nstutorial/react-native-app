// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1djNLMULa4kOk518fi6lsyMxID-DQD0I",
  authDomain: "griha-sajjwa-app.firebaseapp.com",
  databaseURL: "https://griha-sajjwa-app-default-rtdb.firebaseio.com",
  projectId: "griha-sajjwa-app",
  storageBucket: "griha-sajjwa-app.appspot.com",
  messagingSenderId: "233133984980",
  appId: "1:233133984980:web:fcc65c7b8b2e971ae3bf41",
  measurementId: "G-JP03HL89E4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const database = getDatabase(app);