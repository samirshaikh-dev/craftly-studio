import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { config } from "@/config/config";

const firebaseConfig = {
  apiKey: config.firebaseConfig.apiKey,
  authDomain: config.firebaseConfig.authDomain,
  projectId: config.firebaseConfig.projectId,
  storageBucket: config.firebaseConfig.storageBucket,
  messagingSenderId: config.firebaseConfig.messagingSenderId,
  appId: config.firebaseConfig.appId,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = config.firebaseConfig.apiKey ? getAuth(app) : null;
export const storage = config.firebaseConfig.storageBucket ? getStorage(app) : null;
export { app };
