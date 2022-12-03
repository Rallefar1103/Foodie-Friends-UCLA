const admin = require('firebase-admin');
var serviceAccount = require("./key.json");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let auth = admin.auth(firebaseApp);
let db = admin.firestore(firebaseApp);

module.exports = {auth, db}