const { Joi } = require('celebrate');
const Boom = require('boom');

const { findBucket, createAnswer } = require('../../../db/buckets');

const createAnswerValidation = {
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
const createAnswerRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id: bucketId, videoId, pollId },
    body: data,
  } = req;

  const bucket = await findBucket({
    _id: bucketId,
    'videos._id': videoId,
    'videos.polls._id': pollId,
  });
  if (!bucket) {
    return next(Boom.notFound('Bucket, video or poll not found'));
  }

  if (!bucket.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedBucket = await createAnswer(bucketId, videoId, pollId, data, 'polls');
  return res.send(updatedBucket);
};

module.exports = { createAnswerRoute, createAnswerValidation };
