const Boom = require('boom');

const { deleteObject } = require('../../../utils/s3');
const { findQuestion } = require('../../../db/questions');
const { findBucket } = require('../../../db/buckets');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const uploadFileAnswerRoute = async (req, res, next) => {
  const {
    params: { questionId },
    context: { userId },
    files,
  } = req;

  const video = files?.video?.[0];
  if (!video) {
    return next(Boom.badData('Video is missed'));
  }

  const question = await findQuestion({ _id: questionId });
  if (!question) {
    await deleteObject(video.key);
    return next(Boom.notFound());
  }

  const targetId = question.userProfileId || question.bucketId || question.bucketVideoId;
  const isProfileOwner = question.userProfileId && targetId !== userId;
  let isBucketOwner;

  if (question.bucketId) {
    const bucket = await findBucket({ _id: targetId });
    isBucketOwner = bucket.creatorId.equals(userId);
  } else if (question.bucketVideoId) {
    const bucket = await findBucket({ 'videos._id': targetId });
    isBucketOwner = bucket.creatorId.equals(userId);
  }

  if (!isProfileOwner && !isBucketOwner) {
    await deleteObject(video.key);
    return next(Boom.forbidden());
  }

  if (!question.answer) {
    question.answer = {};
  }
  question.answer.videoUrl = video.location;

  await question.save();
  return res.send(question);
};

module.exports = { uploadFileAnswerRoute };
