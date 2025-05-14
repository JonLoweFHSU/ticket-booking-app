import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA7AI83VorFy-H5GmPKzjVsuylV70RnYs4",
    authDomain: "ticketbooking-4dd98.firebaseapp.com",
    projectId: "ticketbooking-4dd98",
    storageBucket: "ticketbooking-4dd98.firebasestorage.app",
    messagingSenderId: "856358962916",
    appId: "1:856358962916:web:43d511848097320e0f0ef1",
    measurementId: "G-95X4C9VFZ9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };