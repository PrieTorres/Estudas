import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { clientConfig } from '@/config';

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(clientConfig);
} else {
  app = getApps()[0];
}

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();
    return { user, idToken };
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
};


export const auth = getAuth(app);
export const firestore = getFirestore(app);
export { app, signInWithGoogle, signOut };
