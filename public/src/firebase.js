import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBL_nihmkK4u_ifGlSiV2iJgJGJ6cyK7vs",
    authDomain: "whatsapp-ade79.firebaseapp.com",
    projectId: "whatsapp-ade79",
    storageBucket: "whatsapp-ade79.appspot.com",
    messagingSenderId: "253740854088",
    appId: "1:253740854088:web:ec884099092d0b2359e17d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore();