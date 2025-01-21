import admin from 'firebase-admin'; // Se usa firebase-admin en lugar de firebase por ser servidor y no app de cliente
import * as serviceAccount from './challenge-atom-jlrt-firebase-adminsdk.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://challenge-atom-jlrt.firebaseio.com"
});


const db = admin.firestore();
export default db;