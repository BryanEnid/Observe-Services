const { Joi } = require('celebrate');
const Boom = require('boom');

const { findBucket, updateAnswer } = require('../../../db/buckets');

const updateAnswerValidation = {
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
const updateAnswerRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id: bucketId, videoId, questionId },
    body: data,
  } = req;

  const bucket = await findBucket({
    _id: bucketId,
    'videos._id': videoId,
    'videos.questions._id': questionId,
  });
  if (!bucket) {
    return next(Boom.notFound('Bucket, video or question not found'));
  }

  if (!bucket.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedBucket = await updateAnswer(bucketId, videoId, questionId, data);
  return res.send(updatedBucket);
};

module.exports = { updateAnswerRoute, updateAnswerValidation };
