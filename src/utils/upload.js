const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('config');

const { s3 } = require('./s3');

const storage = multerS3({
  s3,
  bucket: config.get('fileStorage.s3Bucket'),
});
const uploadToS3 = multer({ storage });

const uploadLocal = multer({ dest: 'uploads/' });

module.exports = { uploadToS3, uploadLocal };
