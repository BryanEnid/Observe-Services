const Boom = require('boom');
const { findBucket } = require('../../../db/buckets');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const getPollsListRoute = async (req, res, next) => {
  const {
    params: { id: bucketId, videoId },
  } = req;

  const bucket = await findBucket({
    _id: bucketId,
    videos: {
      $elemMatch: { _id: videoId },
    },
  });
  if (!bucket) {
    return next(Boom.notFound('Bucket or video not found'));
  }

  const video = bucket.videos?.find(({ id }) => id === videoId);
  return res.send(video.polls || []);
};

module.exports = { getPollsListRoute };
