const { Joi } = require('celebrate');
const Boom = require('boom');

const { findQuestion } = require('../../../db/questions');
const { findBucket } = require('../../../db/buckets');

const updateAnswerValidation = {
  body: Joi.object({
    text: Joi.string().optional().default(''),
    videoUrl: Joi.string().optional().default(null),
  }),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateAnswerRoute = async (req, res, next) => {
  const {
    params: { questionId },
    context: { userId },
    body,
  } = req;

  const question = await findQuestion({ _id: questionId });
  if (!question) {
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
    return next(Boom.forbidden());
  }

  question.answer.text = body.text || question.answer.text;
  question.answer.videoUrl = body.videoUrl || question.answer.videoUrl;

  await question.save();
  return res.send(question);
};

module.exports = { updateAnswerRoute, updateAnswerValidation };
