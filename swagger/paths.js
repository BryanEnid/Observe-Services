const bucketsPaths = require('./paths/buckets');
const profilesPaths = require('./paths/profiles');
const usersPaths = require('./paths/users');
const emojisPaths = require('./paths/emojis');
const uploadPaths = require('./paths/upload');

const paths = {
  ...bucketsPaths,
  ...profilesPaths,
  ...usersPaths,
  ...uploadPaths,
  ...emojisPaths,
};

module.exports = paths;
