const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../utils/error-wrapper');
const defaultSchemaOptions = require('../../utils/celebrate');
const { authMiddleware } = require('../../middlewares/auth-middleware');
const { getEmojisListRoute, getEmojisListValidator } = require('./list');

const router = express.Router();

router.use(authMiddleware());
router.get(
  '/',
  celebrate(getEmojisListValidator, defaultSchemaOptions),
  errorWrapper(getEmojisListRoute),
);

module.exports = router;
