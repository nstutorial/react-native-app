// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import {
//   getAuth,
//   initializeAuth,
//   getReactNativePersistence,
// } from "firebase/auth";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyC1djNLMULa4kOk518fi6lsyMxID-DQD0I",
//   authDomain: "griha-sajjwa-app.firebaseapp.com",
//   databaseURL: "https://griha-sajjwa-app-default-rtdb.firebaseio.com",
//   projectId: "griha-sajjwa-app",
//   storageBucket: "griha-sajjwa-app.appspot.com",
//   messagingSenderId: "233133984980",
//   appId: "1:233133984980:web:fcc65c7b8b2e971ae3bf41",
//   measurementId: "G-JP03HL89E4",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Initialize Auth with AsyncStorage persistence
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
// //const analytics = getAnalytics(app);
// export const database = getDatabase(app);
// //export const auth = getAuth(app);

import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1djNLMULa4kOk518fi6lsyMxID-DQD0I",
  authDomain: "griha-sajjwa-app.firebaseapp.com",
  databaseURL: "https://griha-sajjwa-app-default-rtdb.firebaseio.com",
  projectId: "griha-sajjwa-app",
  storageBucket: "griha-sajjwa-app.appspot.com",
  messagingSenderId: "233133984980",
  appId: "1:233133984980:web:fcc65c7b8b2e971ae3bf41",
  measurementId: "G-JP03HL89E4",
};

let app;
let auth;
let database;

// Initialize Firebase only if no apps have been initialized
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  database = getDatabase(app);
} else {
  app = getApps()[0]; // Use the already initialized app
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  database = getDatabase(app);
}

export { app, auth, database };
