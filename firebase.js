//Update the below URL with the appropriate version if necessary.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
//Update the below URL with the appropriate version if necessary.
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

// INSERT YOUR FIREBASE CONFIG OBJECT HERE
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBuO3ctC7jw29DzW0PrsS8iBHxchbjB_ZQ",
authDomain: "portfoliotracker-fdd69.firebaseapp.com",
projectId: "portfoliotracker-fdd69",
storageBucket: "portfoliotracker-fdd69.appspot.com",
messagingSenderId: "925774173386",
appId: "1:925774173386:web:88f2ec5f62dd14c0f19033",
measurementId: "G-94HG3MPQ6P"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

