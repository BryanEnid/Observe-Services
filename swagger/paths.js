const bucketsPaths = require('./paths/buckets');
const profilesPaths = require('./paths/profiles');
const usersPaths = require('./paths/users');
const emojisPaths = require('./paths/emojis');
const uploadPaths = require('./paths/upload');

const toolsPaths = require('./paths/tools');
const peoplePaths = require('./paths/people');
const videosPaths = require('./paths/videos');
const articlesPaths = require('./paths/articles');
const booksPaths = require('./paths/books');
const quotesPaths = require('./paths/quotes');
const saveForLaterPaths = require('./paths/save-for-later');

const paths = {
  ...bucketsPaths,
  ...profilesPaths,
  ...usersPaths,
  ...uploadPaths,
  ...emojisPaths,
  ...toolsPaths,
  ...peoplePaths,
  ...videosPaths,
  ...articlesPaths,
  ...booksPaths,
  ...quotesPaths,
  ...saveForLaterPaths,
};

module.exports = paths;
