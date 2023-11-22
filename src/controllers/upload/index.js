const express = require('express');

const { authMiddleware } = require('../../middlewares/auth-middleware');
const { upload } = require('../../utils/upload');
const errorWrapper = require('../../utils/error-wrapper');
const uploadProgressRoute = require('./progress');

const router = express.Router();

router.use(authMiddleware());
router.post(
  '/progress',
  upload.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }]),
  errorWrapper(uploadProgressRoute),
);

module.exports = router;
