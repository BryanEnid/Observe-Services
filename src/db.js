const mongoose = require('mongoose');
const config = require('config');

const { logger } = require('./utils/logger');

const connectDB = async () => {
  const url = config.get('db.url');

  try {
    mongoose.connect(url);
  } catch (err) {
    logger().error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;

  dbConnection.once('open', () => {
    logger().info(`Database connected: ${url}`);
  });

  dbConnection.on('error', (err) => {
    logger().info(`connection error: ${err}`);
  });
};

module.exports = connectDB;
