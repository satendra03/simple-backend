// firebase config
import admin from "firebase-admin";
console.log()
console.log("🔥 Loading firebase.config.ts...");

if (!admin.apps.length) {
  try {
    const adminKey = process.env.DB_ADMIN_KEY;
    console.log("🔑 DB_ADMIN_KEY Present:", !!adminKey);
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
