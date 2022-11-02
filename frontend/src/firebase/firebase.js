import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "cs-130-project-9dd62.firebaseapp.com",
    projectId: "cs-130-project-9dd62",
    storageBucket: "cs-130-project-9dd62.appspot.com",
    messagingSenderId: "394888610316",
    appId: "1:394888610316:web:93fd1938d2f06e878f6429",
    measurementId: "G-NBXNJFD0LL"
  };

export const initFirebaseApp = () => {
  return initializeApp(firebaseConfig);
}