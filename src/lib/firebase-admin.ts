/**
 * Firebase Admin SDK — server-only.
 *
 * Import `adminDb` for Firestore writes inside API route handlers and Server
 * Actions. Do NOT import this in any file that can be bundled client-side.
 *
 * Credentials are sourced from the FIREBASE_CONSOLE env variable which must
 * contain the full service-account JSON object (as set in .env).
 */

import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

function getAdminApp(): App {
  const existing = getApps();
  if (existing.length > 0) return existing[0];

  const serviceAccountJson = process.env.FIREBASE_CONSOLE;
  if (!serviceAccountJson) {
    throw new Error(
      "[firebase-admin] FIREBASE_CONSOLE env variable is not set. " +
        "Set it to the full service-account JSON string."
    );
  }

  const serviceAccount = JSON.parse(serviceAccountJson);

  return initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
}

export const adminDb: Firestore = getFirestore(getAdminApp());
