const admin = require('firebase-admin');
const serviceAccount = require('./usuarios-graph-firebase-adminsdk-fbsvc-e7e6900484.json'); // tu clave de servicio de Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
