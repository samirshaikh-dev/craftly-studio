function getFirebaseConfig() {
  let projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "";
  let authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "";
  let storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "";
  let messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "";
  let appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "";
  let apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";

  if (process.env.FIREBASE_CONSOLE) {
    try {
      const parsed = JSON.parse(process.env.FIREBASE_CONSOLE);
      if (parsed.project_id) {
        projectId = projectId || parsed.project_id;
        authDomain = authDomain || `${parsed.project_id}.firebaseapp.com`;
        storageBucket = storageBucket || `${parsed.project_id}.firebasestorage.app`;
      }
      if (parsed.client_id) {
        messagingSenderId = messagingSenderId || String(parsed.client_id).slice(0, 12);
      }
    } catch {
      // Ignore JSON parse error if FIREBASE_CONSOLE is malformed
    }
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };
}

export const config = {
  firebaseConfig: getFirebaseConfig(),
  mailConfig: {
    smtpHost: process.env.SMTP_HOST || "",
    smtpPort: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
    smtpUser: process.env.SMTP_USER || "",
    smtpPass: process.env.SMTP_PASS || "",
    contactEmail: process.env.CONTACT_EMAIL || "craftly.studio.vapi@gmail.com",
  }
} as const;
