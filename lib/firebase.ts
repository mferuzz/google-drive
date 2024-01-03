import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "drive-8a286.firebaseapp.com",
  projectId: "drive-8a286",
  storageBucket: "drive-8a286.appspot.com",
  messagingSenderId: "25850077905",
  appId: "1:25850077905:web:1ccb3cd29ca11fb8659bf0",
};

!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { db };
