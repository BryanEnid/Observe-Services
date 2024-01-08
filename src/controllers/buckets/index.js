const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../utils/error-wrapper');
const defaultSchemaOptions = require('../../utils/celebrate');
const { authMiddleware } = require('../../middlewares/auth-middleware');
const { uploadToS3, uploadLocal } = require('../../utils/upload');
const { getBucketByIdRoute } = require('./get');
const { getBucketsListRoute, listRouteValidator } = require('./list');
const { createBucketRoute, createBucketValidation } = require('./create');
const { updateBucketRoute, updateBucketValidation } = require('./update');
const { deleteBucketRoute } = require('./delete');
const { deleteBucketsCategoryRoute, deleteBucketsCategoryValidator } = require('./delete-category');
const { updateBucketsCategoryRoute, updateBucketsCategoryValidator } = require('./update-category');

const { uploadVideoRoute } = require('./upload-video');
const { uploadAndProcessRoute, uploadAndProcessValidation } = require('./upload-and-process-video');

const { getPollsListRoute } = require('./polls/list');
const { createPollRoute, createPollValidation } = require('./polls/create');
const { updatePollRoute, updatePollValidation } = require('./polls/update');
const { deletePollRoute } = require('./polls/delete');

const {
  createAnswerRoute: createPollAnswerRoute,
  createAnswerValidation: createPollAnswerValidation,
} = require('./polls/create-answer');
const {
  updateAnswerRoute: updatePollAnswerRoute,
  updateAnswerValidation: updatePollAnswerValidation,
} = require('./polls/update-answer');
const { deleteAnswerRoute: deletePollAnswerRoute } = require('./polls/delete-answer');

const router = express.Router();

// router.use(authMiddleware());
router.get('/', celebrate(listRouteValidator, defaultSchemaOptions), errorWrapper(getBucketsListRoute));
router.get('/:id', errorWrapper(getBucketByIdRoute));
router.post(
  '/',
  authMiddleware(),
  express.json(),
  celebrate(createBucketValidation, defaultSchemaOptions),
  errorWrapper(createBucketRoute)
);
router.put(
  '/:id',
  authMiddleware(),
  express.json(),
  celebrate(updateBucketValidation, defaultSchemaOptions),
  errorWrapper(updateBucketRoute)
);
router.delete('/:id', authMiddleware(), errorWrapper(deleteBucketRoute));

router.post(
  '/:id/video',
  authMiddleware(),
  uploadToS3.fields([
    { name: 'video', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  errorWrapper(uploadVideoRoute)
);
router.post(
  '/:id/process',
  authMiddleware(),
  uploadLocal.fields([
    { name: 'mainVideo', maxCount: 1 },
    { name: 'subVideo', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  celebrate(uploadAndProcessValidation),
  errorWrapper(uploadAndProcessRoute)
);

router.put(
  '/categories/:category',
  authMiddleware(),
  express.json(),
  celebrate(updateBucketsCategoryValidator),
  errorWrapper(updateBucketsCategoryRoute)
);
router.delete(
  '/categories/:category',
  authMiddleware(),
  celebrate(deleteBucketsCategoryValidator),
  errorWrapper(deleteBucketsCategoryRoute)
);

router.get('/:id/videos/:videoId/polls', errorWrapper(getPollsListRoute));
router.post(
  '/:id/videos/:videoId/polls',
  authMiddleware(),
  express.json(),
  celebrate(createPollValidation, defaultSchemaOptions),
  errorWrapper(createPollRoute)
);
router.put(
  '/:id/videos/:videoId/polls/:pollId',
  authMiddleware(),
  express.json(),
  celebrate(updatePollValidation, defaultSchemaOptions),
  errorWrapper(updatePollRoute)
);
router.delete('/:id/videos/:videoId/polls/:pollId', errorWrapper(deletePollRoute));

router.post(
  '/:id/videos/:videoId/polls/:pollId/answer',
  authMiddleware(),
  express.json(),
  celebrate(createPollAnswerValidation),
  errorWrapper(createPollAnswerRoute)
);
router.put(
  '/:id/videos/:videoId/polls/:pollId/answer',
  authMiddleware(),
  express.json(),
  celebrate(updatePollAnswerValidation),
  errorWrapper(updatePollAnswerRoute)
);
router.delete('/:id/videos/:videoId/polls/:pollId/answer', authMiddleware(), errorWrapper(deletePollAnswerRoute));

module.exports = router;
