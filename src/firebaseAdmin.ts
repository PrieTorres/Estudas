import admin from 'firebase-admin';
import { serverConfig } from '@/config';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serverConfig.serviceAccount.projectId,
      clientEmail: serverConfig.serviceAccount.clientEmail,
      privateKey: serverConfig.serviceAccount.privateKey,
    }), 
  });
}

export const firestore = admin.firestore();
export const adminAuth = admin.auth();
export { admin };
