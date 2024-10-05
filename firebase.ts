import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { clientConfig } from '@/config';

// Verifica se o app já foi inicializado para evitar múltiplas inicializações
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(clientConfig);
} else {
  app = getApps()[0];
}

// Exporta os módulos que você precisa
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export { app };
