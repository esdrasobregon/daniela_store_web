const admin = require('firebase-admin');
var serviceAccount = require("../../serviceAccountKey.json");

// Initialize firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: serviceAccount.project_id + ".appspot.com"
});
console.log(serviceAccount.project_id + ".appspot.com");
// Cloud storage
const bucket = admin.storage().bucket();
const db = admin.firestore();
module.exports = {
    bucket: bucket,
    db: db
}