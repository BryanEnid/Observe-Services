const express = require('express');
const cors = require('cors');
const config = require('config');
const { errors } = require('celebrate');
// const path = require('path');

const { logger, loggingMiddleware } = require('./utils/logger');
const errorHandler = require('./middlewares/error-handler');
const apiController = require('./controllers/index');
const connectDB = require('./db');

// const SSL_FILENAME = 'D36323EB91D550F499789F8A79C679C0.txt';

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
  expressApp.get('/healthz', (req, res) => res.send('OK')); // Healthz

  // ENABLE THIS WHEN NEEDED
  // expressApp.get(`/.well-known/pki-validation/${SSL_FILENAME}`, (req, res) => {
  //   res.sendFile(SSL_FILENAME, { root: path.join(__dirname, '../') });
  // }); // SSL

  expressApp.use(errors());
  expressApp.use(errorHandler);

  return expressApp;
};

module.exports = app;
