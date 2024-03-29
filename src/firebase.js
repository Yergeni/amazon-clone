import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwt7J_x0mR6QQIZys-SVaF5aY2whlmVv4",
  authDomain: "clone-4a1c8.firebaseapp.com",
  databaseURL: "https://clone-4a1c8.firebaseio.com",
  projectId: "clone-4a1c8",
  storageBucket: "clone-4a1c8.appspot.com",
  messagingSenderId: "832052854539",
  appId: "1:832052854539:web:1dc87a11f6c8e5b3c46c0e",
  measurementId: "G-RNVYQJ8WHX",
};

// Initialize the firebase app
firebase.initializeApp(firebaseConfig);

// Initialize the database
const firestore = firebase.firestore();
// Auth
const auth = firebase.auth();
// Firestore

export { auth, firestore };
