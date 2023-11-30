const { Joi } = require('celebrate');
const Boom = require('boom');

const { findBucket, createQuestion } = require('../../../db/buckets');

const createQuestionValidation = {
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
const createQuestionRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id: bucketId, videoId },
    body: { coords, text },
  } = req;

  const bucket = await findBucket({ _id: bucketId, 'videos._id': videoId });
  if (!bucket) {
    return next(Boom.notFound('Bucket or video not found'));
  }

  const result = await createQuestion(bucketId, videoId, {
    creatorId: userId, coords, text, answer: null,
  });

  return res.send(result);
};

module.exports = { createQuestionRoute, createQuestionValidation };
