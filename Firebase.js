import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS67iSJ9f8pMay2N8m1IlN2Nz3ENhgiKg",
  authDomain: "projectmad-7cdaf.firebaseapp.com",
  projectId: "projectmad-7cdaf",
  storageBucket: "projectmad-7cdaf.firebasestorage.app",
  messagingSenderId: "993704884144",
  appId: "1:993704884144:web:0b6b182c55818a4bbc0875",
  measurementId: "G-D64R31M74D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
