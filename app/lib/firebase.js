// app/lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDolnaQsB7FbtbxQ1hNOykamRue9oLmsKI",
  authDomain: "luci-auth-392ea.firebaseapp.com",
  projectId: "luci-auth-392ea",
  storageBucket: "luci-auth-392ea.firebasestorage.app",
  messagingSenderId: "166265838080",
  appId: "1:166265838080:web:e2945f2a12c1374b2fd6e5",
  measurementId: "G-F74KCRWFQ0",
};

// Initialize Firebase only if it hasn't been initialized
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export default app;
