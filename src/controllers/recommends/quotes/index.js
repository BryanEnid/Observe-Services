const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../../utils/error-wrapper');
const defaultSchemaOptions = require('../../../utils/celebrate');
const { authMiddleware } = require('../../../middlewares/auth-middleware');

const { getQuotesListRoute, getQuotesListValidation } = require('./list');
const { createQuotRoute, createQuotValidation } = require('./create');
const { updateQuotRoute, updateQuotValidation } = require('./update');
const { deleteQuotRoute } = require('./delete');

const router = express.Router();

router.use(authMiddleware());
router.get('/', celebrate(getQuotesListValidation, defaultSchemaOptions), errorWrapper(getQuotesListRoute));
router.post(
  '/',
  express.json(),
  celebrate(createQuotValidation, defaultSchemaOptions),
  errorWrapper(createQuotRoute),
);
router.put(
  '/:id',
  express.json(),
  celebrate(updateQuotValidation, defaultSchemaOptions),
  errorWrapper(updateQuotRoute),
);
router.delete('/:id', errorWrapper(deleteQuotRoute));

module.exports = router;
