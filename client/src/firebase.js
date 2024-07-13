// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'hunger-hub-95006.firebaseapp.com',
  projectId: 'hunger-hub-95006',
  storageBucket: 'hunger-hub-95006.appspot.com',
  messagingSenderId: '961064336687',
  appId: '1:961064336687:web:2dc9326dbeaea30072b5da',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
