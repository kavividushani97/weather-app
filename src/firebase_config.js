import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDO7DnA5CHSxIUbI4PAJNn0cPqnOxzHcno",
  authDomain: "personalized-weather-app.firebaseapp.com",
  projectId: "personalized-weather-app",
  storageBucket: "personalized-weather-app.appspot.com",
  messagingSenderId: "939167140469",
  appId: "1:939167140469:web:03eb65a991670bba4c863c",
  measurementId: "G-J3TRR6NWSC",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
