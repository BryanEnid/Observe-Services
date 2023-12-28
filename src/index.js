const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const https = require('https');

const credentials = {};
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '../.env') });
  const key = fs.readFileSync('private.key');
  const cert = fs.readFileSync('certificate.crt');
  credentials.key = key;
  credentials.cert = cert;
} else {
  dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) });
}

const config = require('config');
const app = require('./app');
const { swagger } = require('../swagger/swagger');
const { logger } = require('./utils/logger');

const port = parseInt(config.get('http.port'), 10);
const host = config.get('http.host');

app().then((expressApp) => {
  swagger(expressApp);

  expressApp.listen(port, host, () => {
    logger().info(`Listening on http://${host}:${port}`);
  });

  https.createServer(credentials, expressApp).listen(8443);
});
