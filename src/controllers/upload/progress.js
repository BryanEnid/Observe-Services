const Boom = require('boom');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const uploadProgressRoute = async (req, res, next) => {
  const { files } = req;

  const video = files?.video?.[0];
  const image = files?.image?.[0];
  if (!video || !image) {
    return next(Boom.badData('Video or image are missed'));
  }

  return res.status(200).send({
    image: image.location,
    videoUrl: video.location,
  });
};

module.exports = uploadProgressRoute;
