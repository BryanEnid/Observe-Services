const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../../utils/error-wrapper');
const defaultSchemaOptions = require('../../../utils/celebrate');
const { authMiddleware } = require('../../../middlewares/auth-middleware');

const { getRoute } = require('./get-all');
const { getByEntityRoute, getByEntityValidation } = require('./get-by-entity');
const { createEntityRoute, createEntityValidation } = require('./create-by-entity');
const { deleteEntityRoute, deleteEntityValidation } = require('./delete-by-entity');

const router = express.Router();

router.use(authMiddleware());

router.get('/', errorWrapper(getRoute));
router.get('/:entity', celebrate(getByEntityValidation, defaultSchemaOptions), errorWrapper(getByEntityRoute));
router.post(
  '/:entity/:entityId',
  celebrate(createEntityValidation, defaultSchemaOptions),
  errorWrapper(createEntityRoute),
);
router.delete(
  '/:entity/:entityId',
  celebrate(deleteEntityValidation, defaultSchemaOptions),
  errorWrapper(deleteEntityRoute),
);

module.exports = router;
