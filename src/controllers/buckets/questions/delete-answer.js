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
    params: { id: bucketId, videoId, questionId },
  } = req;

  const bucket = await findBucket({
    _id: bucketId,
    'videos._id': videoId,
    'videos.questions._id': questionId,
  });
  if (!bucket) {
    return next(Boom.notFound('Bucket, video or question not found'));
  }

  if (!bucket.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  await deleteAnswer(bucketId, videoId, questionId);
  return res.send({ success: true });
};

module.exports = { deleteAnswerRoute };
