const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../utils/error-wrapper');
const { authMiddleware } = require('../../middlewares/auth-middleware');
const { getBucketByIdRoute } = require('./get');
const { getBucketsListRoute, listRouteValidator } = require('./list');
const { createBucketRoute, createBucketValidation } = require('./create');
const { updateBucketRoute, updateBucketValidation } = require('./update');
const { deleteBucketRoute } = require('./delete');

const router = express.Router();

router.use(authMiddleware());
router.get('/', celebrate(listRouteValidator), errorWrapper(getBucketsListRoute));
router.get('/:id', errorWrapper(getBucketByIdRoute));
router.post('/', express.json(), celebrate(createBucketValidation), errorWrapper(createBucketRoute));
router.put('/:id', express.json(), celebrate(updateBucketValidation), errorWrapper(updateBucketRoute));
router.delete('/:id', errorWrapper(deleteBucketRoute));

module.exports = router;
