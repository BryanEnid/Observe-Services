const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../../utils/error-wrapper');
const defaultSchemaOptions = require('../../../utils/celebrate');
const { authMiddleware } = require('../../../middlewares/auth-middleware');
const { uploadToS3 } = require('../../../utils/upload');

const { getBooksListRoute, getBooksListValidation } = require('./list');
const { createBookRoute, createBookValidation } = require('./create');
const { updateBookRoute, updateBookValidation } = require('./update');
const { deleteBookRoute } = require('./delete');

const { createBookPhotoRoute, createBookPhotoValidation } = require('./create-photo');
const { uploadAndUpdatePhotoRoute, uploadAndUpdatePhotoValidation } = require('./upload-and-update-photo');
const { uploadAndCreatePhotoRoute, uploadAndCreatePhotoValidation } = require('./upload-and-create-photo');
const { updateBookPhotoRoute, updateBookPhotoValidation } = require('./update-photo');
const { deleteBookPhotoRoute } = require('./delete-photo');

const router = express.Router();

router.use(authMiddleware());
router.get('/', celebrate(getBooksListValidation, defaultSchemaOptions), errorWrapper(getBooksListRoute));
router.post('/', express.json(), celebrate(createBookValidation, defaultSchemaOptions), errorWrapper(createBookRoute));
router.put('/:id', express.json(), celebrate(updateBookValidation, defaultSchemaOptions), errorWrapper(updateBookRoute));
router.delete('/:id', errorWrapper(deleteBookRoute));

router.post(
  '/:id/photos',
  express.json(),
  celebrate(createBookPhotoValidation, defaultSchemaOptions),
  errorWrapper(createBookPhotoRoute),
);
router.post(
  '/:id/photos/upload',
  uploadToS3.single('photo'),
  celebrate(uploadAndCreatePhotoValidation, defaultSchemaOptions),
  errorWrapper(uploadAndCreatePhotoRoute),
);
router.put(
  '/:id/photos/:photoId',
  express.json(),
  celebrate(updateBookPhotoValidation, defaultSchemaOptions),
  errorWrapper(updateBookPhotoRoute),
);
router.delete('/:id/photos/:photoId', errorWrapper(deleteBookPhotoRoute));
router.put(
  '/:id/photos/:photoId/upload',
  uploadToS3.single('photo'),
  celebrate(uploadAndUpdatePhotoValidation, defaultSchemaOptions),
  errorWrapper(uploadAndUpdatePhotoRoute),
);

module.exports = router;
