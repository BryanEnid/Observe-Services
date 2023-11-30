const Boom = require('boom');
const { deletePoll, findBucket } = require('../../../db/buckets');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const deletePollRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id: bucketId, videoId, pollId },
  } = req;

  const bucket = await findBucket({
    _id: bucketId,
    'videos._id': videoId,
    'videos.polls._id': pollId,
  });
  if (!bucket) {
    return next(Boom.notFound('Bucket, video or poll not found'));
  }

  const video = bucket.videos?.find(
    ({ polls }) => !!polls?.find(
      ({ _id, creatorId }) => _id.equals(pollId) && creatorId.equals(userId),
    ),
  );
  if (!(bucket.creatorId.equals(userId) || !!video)) {
    return next(Boom.forbidden());
  }

  await deletePoll(bucketId, videoId, pollId);
  return res.send({ success: true });
};

module.exports = { deletePollRoute };
