// Firebase configuration
// Replace with your Firebase project credentials from Firebase Console
export const firebaseConfig = {
  apiKey: (import.meta as any).env.NG_APP_FIREBASE_API_KEY,
  authDomain: (import.meta as any).env.NG_APP_FIREBASE_AUTH_DOMAIN,
  projectId: (import.meta as any).env.NG_APP_FIREBASE_PROJECT_ID,
  storageBucket: "tourizio-6fe0f.firebasestorage.app",
  messagingSenderId: "563599121560",
  appId: "1:563599121560:web:4a689a6971c371cd4d84ed"
};
