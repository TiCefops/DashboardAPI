const admin = require('firebase-admin');

const serviceAccount = require('../Service/cefops-firebase-adminsdk-delx1-c80058bea1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // outras configurações opcionais, se necessário
});

module.exports = admin;
