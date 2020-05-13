
const admin = require('firebase-admin');
const serviceAccount = require('./fbadminkey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB_URL,
    storageBucket: process.env.STORAGE_BUCKET
});

const db = admin.firestore();
const storage = admin.storage();
module.exports = { db, storage };

