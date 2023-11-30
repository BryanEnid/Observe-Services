const Boom = require('boom');
const { deleteQuestion, findBucket } = require('../../../db/buckets');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const deleteQuestionRoute = async (req, res, next) => {
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

  const video = bucket.videos?.find(
    ({ questions }) => !!questions?.find(
      ({ _id, creatorId }) => _id.equals(questionId) && creatorId.equals(userId),
    ),
  );
  if (!(bucket.creatorId.equals(userId) || !!video)) {
    return next(Boom.forbidden());
  }

  await deleteQuestion(bucketId, videoId, questionId);
  return res.send({ success: true });
};

module.exports = { deleteQuestionRoute };
