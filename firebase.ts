import { clientConfig } from '@/config';
import { initializeApp } from 'firebase/app';

export const app = initializeApp(clientConfig);