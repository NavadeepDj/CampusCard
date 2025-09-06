'use client';
import { GoogleAuthProvider, signInWithRedirect, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "./firebase";

export const signInWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithRedirect(auth, provider);
        // signInWithRedirect will navigate the user away from the app.
        // The user's authentication state will be available after the redirect
        // is handled by the onAuthStateChanged listener in the AuthProvider.
    } catch (error) {
        console.error("Error initiating Google Sign-In: ", error);
        // Re-throw to allow the UI to handle the error.
        throw error;
    }
};

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error("Error signing out: ", error);
    }
};
