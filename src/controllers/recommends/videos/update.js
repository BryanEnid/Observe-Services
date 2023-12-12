const { Joi } = require('celebrate');
const Boom = require('boom');

const { logger } = require('../../../utils/logger');
const { getYoutubeVideoMeta } = require('../../../services/videos');
const { findVideo, updateVideo } = require('../../../db/videos');

const updateVideoValidation = {
  body: Joi.object({
    url: Joi.string().required(),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateVideoRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id },
    body: { url },
  } = req;

  const existingVideo = await findVideo({ _id: id });
  if (!existingVideo) {
    return next(Boom.notFound('Video not found'));
  }
  if (!existingVideo.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  try {
    const data = await getYoutubeVideoMeta(url);
    if (!data?.title || !data?.duration) {
      return next(Boom.badData('Video does not exist'));
    }

    const updatedVideo = await updateVideo(
      { _id: id, creatorId: userId },
      {
        $set: { ...data, videoUrl: url },
      },
    );
    return res.send(updatedVideo);
  } catch (err) {
    logger().error(err);
    return next(Boom.internal(err.message));
  }
};

module.exports = { updateVideoRoute, updateVideoValidation };
