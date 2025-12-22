// firebase config
import admin from "firebase-admin";

// const firebaseConfig = {
//   apiKey: process.env.DB_API_KEY,
//   authDomain: process.env.DB_AUTH_DOMAIN,
//   projectId: process.env.DB_PROJECT_ID,
//   storageBucket: process.env.DB_STORAGE_BUCKET,
//   messagingSenderId: process.env.DB_MESSAGING_SENDER_ID,
//   appId: process.env.DB_APP_ID
// };

if (!admin.apps.length) {
  try {
    const adminKey = process.env.DB_ADMIN_KEY;
    if (!adminKey) {
      console.error("❌ DB_ADMIN_KEY is undefined in firebase.ts");
    }

    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(adminKey as string)),
    });
  } catch (error) {
    console.error("❌ Error initializing Firebase Admin:", error);
    process.exit(1);
  }
}
const auth = admin.auth();
const db = admin.firestore();

export { admin, auth, db };
