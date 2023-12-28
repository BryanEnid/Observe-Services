const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../utils/error-wrapper');
const defaultSchemaOptions = require('../../utils/celebrate');
const { uploadToS3 } = require('../../utils/upload');
const { authMiddleware } = require('../../middlewares/auth-middleware');

const { getQuestionsListRoute, getQuestionsListValidation } = require('./list');
const { createQuestionRoute, createQuestionValidation } = require('./create');
const { updateQuestionRoute, updateQuestionValidation } = require('./update');
const { upvoteQuestionRoute } = require('./upvote');
const { deleteQuestionRoute } = require('./delete');

const { createAnswerRoute, createAnswerValidation } = require('./answer/create');
const { updateAnswerRoute, updateAnswerValidation } = require('./answer/update');
const { uploadFileAnswerRoute } = require('./answer/upload');

const router = express.Router();

router.use(authMiddleware());

router.get(
  '/',
  celebrate(getQuestionsListValidation, defaultSchemaOptions),
  errorWrapper(getQuestionsListRoute)
);
router.post(
  '/',
  express.json(),
  celebrate(createQuestionValidation, defaultSchemaOptions),
  errorWrapper(createQuestionRoute),
);
router.put(
  '/:questionId',
  express.json(),
  celebrate(updateQuestionValidation, defaultSchemaOptions),
  errorWrapper(updateQuestionRoute),
);
router.put(
  '/:questionId/upvote',
  errorWrapper(upvoteQuestionRoute),
);
router.delete('/:questionId', errorWrapper(deleteQuestionRoute));

router.post(
  '/:questionId/answer',
  express.json(),
  celebrate(createAnswerValidation, defaultSchemaOptions),
  errorWrapper(createAnswerRoute),
);
router.put(
  '/:questionId/answer',
  express.json(),
  celebrate(updateAnswerValidation, defaultSchemaOptions),
  errorWrapper(updateAnswerRoute),
);
router.post(
  '/:questionId/answer/upload',
  uploadToS3.fields([{ name: 'video', maxCount: 1 }]),
  errorWrapper(uploadFileAnswerRoute),
);

module.exports = router;
