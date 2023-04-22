// Update the below URL with the appropriate version if necessary.
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// INSERT YOUR FIREBASE CONFIG OBJECT HERE
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBuO3ctC7jw29DzW0PrsS8iBHxchbjB_ZQ',
  authDomain: 'portfoliotracker-fdd69.firebaseapp.com',
  projectId: 'portfoliotracker-fdd69',
  storageBucket: 'portfoliotracker-fdd69.appspot.com',
  messagingSenderId: '925774173386',
  appId: '1:925774173386:web:88f2ec5f62dd14c0f19033',
  measurementId: 'G-94HG3MPQ6P',
};

const app = initializeApp(firebaseConfig);

// Authentication:

const auth = getAuth();

export function signUp(email, password) {
  console.log('SIGNUP FUNCTION CALLED IN AUTHENTICATION.JS');
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email, password) {
  console.log('SINGIN FUNCTION CALLED IN AUTHENTICATION.JS');
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  console.log('SIGNOUT FUNCTION CALLED IN AUTHENTICATION.JS');
  return signOut(auth);
}

// Export auth and app instances
export { auth, app, onAuthStateChanged };


// ------------ Firestore ------------ //
const db = getFirestore(app);
