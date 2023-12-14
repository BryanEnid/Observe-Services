const admin = require('firebase-admin');
const config = require('config');

const serviceAccount = {
  ...config.get('firebase'),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
