// src/firebase/firebase.js

import { initializeApp } from "firebase/app";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "firebase/auth";

import {
    getDatabase
} from "firebase/database";



const firebaseConfig = {

    apiKey: "AIzaSyBFIDfCz-6Mlc1IOTz2aeiL6VC-MlaFxsI",

    authDomain: "exam-4d98a.firebaseapp.com",

    databaseURL:
        "https://exam-4d98a-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "exam-4d98a",

    storageBucket: "exam-4d98a.appspot.com",

    messagingSenderId: "1065678061694",

    appId: "1:1065678061694:web:8513949fc7eceb2245d82f"

};



const app =
    initializeApp(firebaseConfig);



export const auth =
    getAuth(app);



export const database =
    getDatabase(app);



const provider =
    new GoogleAuthProvider();



export const loginGoogle =
    async()=>{

        const result =
            await signInWithPopup(
                auth,
                provider
            );


        const user = {

            name:
            result.user.displayName,

            email:
            result.user.email,

            photo:
            result.user.photoURL,

            uid:
            result.user.uid
        };


        localStorage.setItem(

            "auth_user",

            JSON.stringify(user)

        );


        return user;
    };



export const logout=
    async()=>{

        await signOut(auth);

        localStorage.clear();

    };
