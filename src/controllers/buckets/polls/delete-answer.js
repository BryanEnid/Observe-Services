const Boom = require('boom');

const { findBucket, deleteAnswer } = require('../../../db/buckets');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const deleteAnswerRoute = async (req, res, next) => {
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

  if (!bucket.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  await deleteAnswer(bucketId, videoId, pollId, 'polls');
  return res.send({ success: true });
};

module.exports = { deleteAnswerRoute };
