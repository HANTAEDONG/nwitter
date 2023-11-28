import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// 데이터 베이스와 스토리지 권한 얻기, 직접 접근 권한 얻음
export const storage = getStorage(app);
export const db = getFirestore(app);
