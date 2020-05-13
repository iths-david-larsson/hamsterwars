
const admin = require('firebase-admin');

const serviceAccount = require('./fbadminkey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hamsterwarsiths.firebaseio.com"
});

const db = admin.firestore();
module.exports = { db };

