// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmaZrRdS8DbugJupE8KUPFU65mZ0vonOk",
  authDomain: "genius-car-services-c0184.firebaseapp.com",
  projectId: "genius-car-services-c0184",
  storageBucket: "genius-car-services-c0184.appspot.com",
  messagingSenderId: "592074322970",
  appId: "1:592074322970:web:39c2ed254305606a38cda3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
