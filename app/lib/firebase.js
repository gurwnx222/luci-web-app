// app/lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBhJojzDnr_iHoAhPasiz_GKRqFQuXQ3Q",
  authDomain: "luci-web-app.firebaseapp.com",
  projectId: "luci-web-app",
  storageBucket: "luci-web-app.firebasestorage.app",
  messagingSenderId: "120828461908",
  appId: "1:120828461908:web:1bcbeddca292fdc8cf7ec1",
  measurementId: "G-GW8GQHPEBF",
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
