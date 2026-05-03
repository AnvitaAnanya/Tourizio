/// <reference types="vite/client" />

// Firebase configuration loaded from environment variables
// Set up your .env file with VITE_FIREBASE_* variables
// See .env.example for template

export const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY,
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "tourizio-6fe0f.firebasestorage.app",
  messagingSenderId: "563599121560",
  appId: "1:563599121560:web:4a689a6971c371cd4d84ed"
};