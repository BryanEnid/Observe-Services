const Boom = require('boom');
const { Joi } = require('celebrate');

const { logger } = require('../../../utils/logger');
const { createVideo } = require('../../../db/videos');
const { getYoutubeVideoMeta } = require('../../../services/videos');

const createVideoValidation = {
  body: Joi.object({
    url: Joi.string().required(),
  }).required(),
};

const createVideoRoute = async (req, res, next) => {
  const { context: { userId }, body: { url } } = req;

  try {
    const data = await getYoutubeVideoMeta(url);
    if (!data?.title || !data?.duration) {
      return next(Boom.badData('Video does not exist'));
    }

    const video = await createVideo({ ...data, videoUrl: url, creatorId: userId });
    return res.send(video);
  } catch (err) {
    logger().error(err);
    return next(Boom.internal(err.message));
  }
};

module.exports = { createVideoRoute, createVideoValidation };
