const { Router } = require('express');

const usersController = require('./users');
const bucketsController = require('./buckets');
const uploadController = require('./upload');
const profileController = require('./profile');
const emojisController = require('./emojis');

const apiController = Router();

apiController.use('/users', usersController);
apiController.use('/buckets', bucketsController);
apiController.use('/upload', uploadController);
apiController.use('/profiles', profileController);
apiController.use('/emojis', emojisController);

module.exports = apiController;
