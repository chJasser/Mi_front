// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD684MLV0xOEXVIWwaMtcuj3n1TdbzK_VQ",
    authDomain: "mi-universe.firebaseapp.com",
    projectId: "mi-universe",
    storageBucket: "mi-universe.appspot.com",
    messagingSenderId: "244293251074",
    appId: "1:244293251074:web:0fc21c9a8e053b1602b71b",
    measurementId: "G-PGEZCL5BXY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
