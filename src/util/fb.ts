// Firebaseの設定
import * as admin from "firebase-admin";

// Initialize the Firebase Admin SDK, if it hasn't been initialized already.
// This should be done only once in your application.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  });
}

export const firestore = admin.firestore();
