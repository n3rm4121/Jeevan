import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// below secrets are not real, replace them with your own ;)
const firebaseConfig = {
    apiKey: 'AIzaSyDon_DN6B0oUgm2XN32aeOtRPpIZW-O-Mg',
    authDomain: 'project-id.firebaseapp.com',
    databaseURL: 'https://project-id.firebaseio.com',
    projectId: 'blood-44832',
    storageBucket: 'blood-44832.firebasestorage.app',
    appId: '1:958764173154:android:85663462fba4998577ce3b',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
