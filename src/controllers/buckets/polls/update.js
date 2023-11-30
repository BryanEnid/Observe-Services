const { Joi } = require('celebrate');
const Boom = require('boom');

const { findBucket, updatePoll } = require('../../../db/buckets');

const updatePollValidation = {
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
const updatePollRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id: bucketId, videoId, pollId },
    body: { coords, text, options },
  } = req;

  const bucket = await findBucket({
    _id: bucketId,
    'videos._id': videoId,
    'videos.polls._id': pollId,
  });
  if (!bucket) {
    return next(Boom.notFound('Bucket or video not found'));
  }

  const video = bucket.videos?.find(
    ({ polls }) => !!polls?.find(
      ({ _id, creatorId }) => _id.equals(pollId) && creatorId.equals(userId),
    ),
  );

  if (!(bucket.creatorId.equals(userId) || !!video)) {
    return next(Boom.forbidden());
  }

  const result = await updatePoll(bucketId, videoId, pollId, { coords, text, options });

  return res.send(result);
};

module.exports = { updatePollRoute, updatePollValidation };
