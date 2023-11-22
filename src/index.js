const path = require('path');
const dotenv = require('dotenv');

// Needs to be loaded before config
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.join(__dirname, '../.env') });
}

const config = require('config');
const app = require('./app');
const { swagger } = require('../swagger/swagger');
const { logger } = require('./utils/logger');

const port = parseInt(config.get('http.port'), 10);
const host = config.get('http.host');

app().then(expressApp => {
  swagger(expressApp);

  expressApp.listen(port, host, () => {
    logger().info(`Listening on http://${host}:${port}`);
  });
});
