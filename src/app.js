const express = require('express');
const cors = require('cors');
const config = require('config');
const { errors } = require('celebrate');

const { logger, loggingMiddleware } = require('./utils/logger');
const errorHandler = require('./middlewares/error-handler');
const apiController = require('./controllers/index');
const connectDB = require('./db');

const PKI_VALIDATION_FILE_NAME = '50B387661507659EE66DCD9139EC7ECA.txt';

const app = async () => {
  const corsWhitelist = config.get('cors');
  const expressApp = express();
  await connectDB();

  expressApp.use(loggingMiddleware());

  if (corsWhitelist.length > 0) {
    logger().debug(`apply cors for: ${corsWhitelist.join(', ')}`);
    expressApp.use(
      cors({
        origin(origin, callback) {
          if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
      })
    );
  }

  expressApp.use('/api', apiController);

  expressApp.get('/healthz', (req, res) => res.send('OK'));
  expressApp.get(`/.well-known/pki-validation/${PKI_VALIDATION_FILE_NAME}`, (req, res) => res.sendFile(PKI_VALIDATION_FILE_NAME, { root: './' }));
  expressApp.use(errors());
  expressApp.use(errorHandler);

  return expressApp;
};

module.exports = app;
