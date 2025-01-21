import admin from 'firebase-admin';
import * as serviceAccount from './challenge-atom-jlrt-firebase-adminsdk.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://challenge-atom-jlrt.firebaseio.com"
});


const db = admin.firestore();
export default db;