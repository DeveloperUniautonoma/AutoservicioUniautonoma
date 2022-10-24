// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0-QUj5Nnr7v8UThmVDtoPEoLJNPShTwg",
  authDomain: "autoservicio-61116.firebaseapp.com",
  projectId: "autoservicio-61116",
  storageBucket: "autoservicio-61116.appspot.com",
  messagingSenderId: "208374114014",
  appId: "1:208374114014:web:9555debe20d8839907c44f",
  measurementId: "G-8VZPSLM89Q" 
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(FirebaseApp);
export const FirebaseAuth = getAuth(FirebaseApp);