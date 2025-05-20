'use client';

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

let firebaseApp;
let firestore;
let storage;
let auth;

// Inicialización perezosa de Firebase - solo se ejecutará en el navegador
export function initFirebase() {
  if (typeof window === 'undefined') {
    return { firebaseApp: null, firestore: null, storage: null, auth: null };
  }
  
  // Verificar si ya está inicializado
  if (getApps().length === 0) {
    // Configuración de Firebase
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };
    
    // Inicializar Firebase
    firebaseApp = initializeApp(firebaseConfig);
    firestore = getFirestore(firebaseApp);
    storage = getStorage(firebaseApp);
    auth = getAuth(firebaseApp);
  } else {
    firebaseApp = getApps()[0];
    firestore = getFirestore(firebaseApp);
    storage = getStorage(firebaseApp);
    auth = getAuth(firebaseApp);
  }
  
  return { firebaseApp, firestore, storage, auth };
}

// Hook para usar Firebase en el cliente
export function useFirebase() {
  if (typeof window === 'undefined') {
    return { firebaseApp: null, firestore: null, storage: null, auth: null };
  }
  
  if (!firebaseApp) {
    return initFirebase();
  }
  
  return { firebaseApp, firestore, storage, auth };
}