const { Router } = require('express');

const usersController = require('./users/index');
const bucketsController = require('./buckets/index');
const uploadController = require('./upload/index');

const apiController = Router();

apiController.use('/users', usersController);
apiController.use('/buckets', bucketsController);
apiController.use('/upload', uploadController);

module.exports = apiController;
