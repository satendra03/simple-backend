// firebase config
import admin from "firebase-admin";

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
