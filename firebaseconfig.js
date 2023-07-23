import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
    getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs, getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBHL0TNbJqz9PYNxeAWRc1TtrkvK-McOKI",
    authDomain: "ahsan-158cd.firebaseapp.com",
    projectId: "ahsan-158cd",
    storageBucket: "ahsan-158cd.appspot.com",
    messagingSenderId: "404752426980",
    appId: "1:404752426980:web:cd744c40a115b19a3689f1"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export{
    auth,
    app,
    db,
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getAuth,
    createUserWithEmailAndPassword,
    query,
    where,
    getDocs,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
};