import admin from 'firebase-admin';
import { serverConfig } from '@/config'; // serverConfig contains the private Firebase config keys

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serverConfig), // Your Firebase Admin credentials
  });
}

export const firestore = admin.firestore();
