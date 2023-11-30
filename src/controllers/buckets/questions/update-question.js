const { Joi } = require('celebrate');
const Boom = require('boom');

const { findBucket, updateQuestion } = require('../../../db/buckets');

const updateQuestionValidation = {
  body: Joi.object({
    coords: Joi.object({
      x: Joi.number().required(),
      y: Joi.number().required(),
    }).required(),
    text: Joi.string().required(),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateQuestionRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id: bucketId, videoId, questionId },
    body: { coords, text },
  } = req;

  const bucket = await findBucket({
    _id: bucketId,
    'videos._id': videoId,
    'videos.questions._id': questionId,
  });
  if (!bucket) {
    return next(Boom.notFound('Bucket or video not found'));
  }

  const video = bucket.videos?.find(
    ({ questions }) => !!questions?.find(
      ({ _id, creatorId }) => _id.equals(questionId) && creatorId.equals(userId),
    ),
  );

  if (!(bucket.creatorId.equals(userId) || !!video)) {
    return next(Boom.forbidden());
  }

  const result = await updateQuestion(bucketId, videoId, questionId, { coords, text });

  return res.send(result);
};

module.exports = { updateQuestionRoute, updateQuestionValidation };
