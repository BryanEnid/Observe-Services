const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../../utils/error-wrapper');
const defaultSchemaOptions = require('../../../utils/celebrate');
const { authMiddleware } = require('../../../middlewares/auth-middleware');

const { getArticlesListRoute, getArticlesListValidation } = require('./list');
const { createArticleRoute, createArticleValidation } = require('./create');
const { updateArticleRoute, updateArticleValidation } = require('./update');
const { deleteArticleRoute } = require('./delete');

const router = express.Router();

router.use(authMiddleware());
router.get('/', celebrate(getArticlesListValidation, defaultSchemaOptions), errorWrapper(getArticlesListRoute));
router.post(
  '/',
  express.json(),
  celebrate(createArticleValidation, defaultSchemaOptions),
  errorWrapper(createArticleRoute),
);
router.put('/:id', express.json(), celebrate(updateArticleValidation, defaultSchemaOptions), errorWrapper(updateArticleRoute));
router.delete('/:id', errorWrapper(deleteArticleRoute));

module.exports = router;
