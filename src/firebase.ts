import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB2huZUwASyslZvqEcRQkyA_GRfSwF14a0",
    authDomain: "nwitter-reloaded-4a133.firebaseapp.com",
    projectId: "nwitter-reloaded-4a133",
    storageBucket: "nwitter-reloaded-4a133.appspot.com",
    messagingSenderId: "399201410351",
    appId: "1:399201410351:web:af0a10a2af1525c38a15da"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
