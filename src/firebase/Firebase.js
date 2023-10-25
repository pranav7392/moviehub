import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore,collection} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDJ-8-OVrE_SBP0raxcTrnDt3lzAl9gbdU",
  authDomain: "dhruv-22740.firebaseapp.com",
  projectId: "dhruv-22740",
  storageBucket: "dhruv-22740.appspot.com",
  messagingSenderId: "767161074727",
  appId: "1:767161074727:web:a91f0a3d1c596f252c3a02",
  measurementId: "G-1XJ0B73621"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = getFirestore(app)
export const Moviedata=collection(db,"movie")
export const Reviewdata=collection(db,"review")
export const Userdata=collection(db,"users")
export const Wishlistdata=collection(db,"wishlist")
export default app;