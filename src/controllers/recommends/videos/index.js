const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../../utils/error-wrapper');
const defaultSchemaOptions = require('../../../utils/celebrate');
const { authMiddleware } = require('../../../middlewares/auth-middleware');

const { getVideosListRoute, getVideosListValidation } = require('./list');
const { createVideoRoute, createVideoValidation } = require('./create');
const { updateVideoRoute, updateVideoValidation } = require('./update');
const { deleteVideoRoute } = require('./delete');

const router = express.Router();

router.use(authMiddleware());
router.get('/', celebrate(getVideosListValidation, defaultSchemaOptions), errorWrapper(getVideosListRoute));
router.post('/', express.json(), celebrate(createVideoValidation, defaultSchemaOptions), errorWrapper(createVideoRoute));
router.put('/:id', express.json(), celebrate(updateVideoValidation, defaultSchemaOptions), errorWrapper(updateVideoRoute));
router.delete('/:id', errorWrapper(deleteVideoRoute));

module.exports = router;
