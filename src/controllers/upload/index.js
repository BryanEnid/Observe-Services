const express = require('express');

const { authMiddleware } = require('../../middlewares/auth-middleware');
const { uploadToS3 } = require('../../utils/upload');
const errorWrapper = require('../../utils/error-wrapper');
const uploadProgressRoute = require('./progress');

const router = express.Router();

router.use(authMiddleware());
router.post(
  '/progress',
  uploadToS3.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }]),
  errorWrapper(uploadProgressRoute),
);

module.exports = router;
