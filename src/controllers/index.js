const { Router } = require('express');

const usersController = require('./users');
const bucketsController = require('./buckets');
const uploadController = require('./upload');
const profileController = require('./profile');
const emojisController = require('./emojis');
const recommendsController = require('./recommends');
const toolsController = require('./recommends/tools');
const peopleController = require('./recommends/people');
const videosController = require('./recommends/videos');
const booksController = require('./recommends/books');
const saveForLaterController = require('./recommends/save-for-later');
const quotesController = require('./recommends/quotes');
const articlesController = require('./recommends/articles');
const questionsController = require('./questions');
const linkedinAuthController = require('./linkedin');

const apiController = Router();

apiController.use('/users', usersController);
apiController.use('/buckets', bucketsController);
apiController.use('/upload', uploadController);
apiController.use('/profiles', profileController);
apiController.use('/emojis', emojisController);
apiController.use('/recommends', recommendsController);
apiController.use('/tools', toolsController);
apiController.use('/people', peopleController);
apiController.use('/videos', videosController);
apiController.use('/books', booksController);
apiController.use('/save-for-later', saveForLaterController);
apiController.use('/quotes', quotesController);
apiController.use('/articles', articlesController);
apiController.use('/questions', questionsController);
apiController.use('/auth/linkedin', linkedinAuthController);

module.exports = apiController;
