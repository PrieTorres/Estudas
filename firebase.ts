import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { clientConfig } from '@/config';

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(clientConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export { app };
