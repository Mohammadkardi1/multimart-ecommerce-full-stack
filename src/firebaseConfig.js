import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAgkoh6FdPxjh8BTVm4gpK2RyHBRUIilE0",
    authDomain: "maltimat-2.firebaseapp.com",
    projectId: "maltimat-2",
    storageBucket: "maltimat-2.appspot.com",
    messagingSenderId: "506637640611",
    appId: "1:506637640611:web:2a7a1621889824490ab016"
};


export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const storage = getStorage(app)

export const db = getFirestore(app)