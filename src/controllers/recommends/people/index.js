const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../../utils/error-wrapper');
const defaultSchemaOptions = require('../../../utils/celebrate');
const { authMiddleware } = require('../../../middlewares/auth-middleware');
const { uploadToS3 } = require('../../../utils/upload');

const { getPeopleListRoute, getPeopleListValidation } = require('./list');
const { createPeopleRoute, createPeopleValidation } = require('./create');
const { updatePeopleRoute, updatePeopleValidation } = require('./update');
const { deletePeopleRoute } = require('./delete');
const { uploadPeopleLogoRoute } = require('./upload');

const router = express.Router();

router.use(authMiddleware());
router.get('/', celebrate(getPeopleListValidation, defaultSchemaOptions), errorWrapper(getPeopleListRoute));
router.post('/', express.json(), celebrate(createPeopleValidation, defaultSchemaOptions), errorWrapper(createPeopleRoute));
router.put('/:id', express.json(), celebrate(updatePeopleValidation, defaultSchemaOptions), errorWrapper(updatePeopleRoute));
router.delete('/:id', errorWrapper(deletePeopleRoute));
router.put('/:id/upload', uploadToS3.single('picture'), errorWrapper(uploadPeopleLogoRoute));

module.exports = router;
