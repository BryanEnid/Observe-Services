const { Joi } = require('celebrate');
const Boom = require('boom');

const { findBucket, createPoll } = require('../../../db/buckets');

const createPollValidation = {
  body: Joi.object({
    coords: Joi.object({
      x: Joi.number().required(),
      y: Joi.number().required(),
    }).required(),
    text: Joi.string().required(),
    options: Joi.array().items(
      Joi.object({
        text: Joi.string().required(),
      }),
    ).required(),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const createPollRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id: bucketId, videoId },
    body: { coords, text, options },
  } = req;

  const bucket = await findBucket({ _id: bucketId, 'videos._id': videoId });
  if (!bucket) {
    return next(Boom.notFound('Bucket or video not found'));
  }

  const result = await createPoll(bucketId, videoId, {
    creatorId: userId, coords, text, options, answer: null,
  });

  return res.send(result);
};

module.exports = { createPollRoute, createPollValidation };
