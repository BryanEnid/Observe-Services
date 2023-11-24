const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../utils/error-wrapper');
const { authMiddleware } = require('../../middlewares/auth-middleware');
const { uploadToS3, uploadLocal } = require('../../utils/upload');
const { getBucketByIdRoute } = require('./get');
const { getBucketsListRoute, listRouteValidator } = require('./list');
const { createBucketRoute, createBucketValidation } = require('./create');
const { updateBucketRoute, updateBucketValidation } = require('./update');
const { deleteBucketRoute } = require('./delete');
const { uploadVideoRoute } = require('./upload-video');
const { uploadAndProcessRoute } = require('./upload-and-process-video');

const router = express.Router();

router.use(authMiddleware());
router.get('/', celebrate(listRouteValidator), errorWrapper(getBucketsListRoute));
router.get('/:id', errorWrapper(getBucketByIdRoute));
router.post('/', express.json(), celebrate(createBucketValidation), errorWrapper(createBucketRoute));
router.put('/:id', express.json(), celebrate(updateBucketValidation), errorWrapper(updateBucketRoute));
router.delete('/:id', errorWrapper(deleteBucketRoute));
router.post(
  '/:id/video',
  uploadToS3.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }]),
  errorWrapper(uploadVideoRoute),
);
router.post(
  '/:id/process',
  uploadLocal.fields([{ name: 'mainVideo', maxCount: 1 }, { name: 'subVideo', maxCount: 1 }, { name: 'image', maxCount: 1 }]),
  errorWrapper(uploadAndProcessRoute),
);

module.exports = router;
