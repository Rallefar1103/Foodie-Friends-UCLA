// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import App from "../frontend/App";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACmKDT7ISd1l_xxQJ_VMqAf2K09Tx1mFU",
  authDomain: "cs-130-project-9dd62.firebaseapp.com",
  projectId: "cs-130-project-9dd62",
  storageBucket: "cs-130-project-9dd62.appspot.com",
  messagingSenderId: "394888610316",
  appId: "1:394888610316:web:93fd1938d2f06e878f6429",
  measurementId: "G-NBXNJFD0LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);