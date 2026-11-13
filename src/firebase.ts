import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
const config = {
 apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBpZTHzKrgNU4KLVsfcRuFBzUlgrbTN8kM',
 authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dj-box-movie.firebaseapp.com',
 databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL || 'https://dj-box-movie-default-rtdb.firebaseio.com',
 projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'dj-box-movie',
 storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'dj-box-movie.firebasestorage.app',
 messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '841030962604',
 appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:841030962604:web:2a948b5717026494ddfe09'
};
export const firebaseApp = getApps().length ? getApps()[0] : initializeApp(config);
export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);
