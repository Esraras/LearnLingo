
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "learnlingo-b7867.firebaseapp.com",
  projectId: "learnlingo-b7867",
  storageBucket: "learnlingo-b7867.firebasestorage.app",
  messagingSenderId: "768407707316",
  appId: import.meta.env.VITE_APP_ID,
  measurementId: "G-LYZFHV5VRL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, analytics, auth, provider };
