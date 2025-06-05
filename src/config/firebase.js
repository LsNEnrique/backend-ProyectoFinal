import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

console.log("PROJECT_ID:", process.env.FIREBASE_PROJECT_ID)
console.log("PRIVATE_KEY:", process.env.FIREBASE_PRIVATE_KEY ? "[OK]" : "[MISSING]")
console.log("CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL)

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});

export const db = admin.firestore()