const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../../utils/error-wrapper');
const defaultSchemaOptions = require('../../../utils/celebrate');
const { authMiddleware } = require('../../../middlewares/auth-middleware');
const { uploadToS3 } = require('../../../utils/upload');

const { getToolsListRoute, getToolsListValidation } = require('./list');
const { createToolRoute, createToolValidation } = require('./create');
const { updateToolRoute, updateToolValidation } = require('./update');
const { deleteToolRoute } = require('./delete');
const { uploadToolLogoRoute } = require('./upload');

const router = express.Router();

router.use(authMiddleware());
router.get('/', celebrate(getToolsListValidation, defaultSchemaOptions), errorWrapper(getToolsListRoute));
router.post('/', express.json(), celebrate(createToolValidation, defaultSchemaOptions), errorWrapper(createToolRoute));
router.put('/:id', express.json(), celebrate(updateToolValidation, defaultSchemaOptions), errorWrapper(updateToolRoute));
router.delete('/:id', errorWrapper(deleteToolRoute));
router.put('/:id/upload', uploadToS3.single('picture'), errorWrapper(uploadToolLogoRoute));

module.exports = router;
