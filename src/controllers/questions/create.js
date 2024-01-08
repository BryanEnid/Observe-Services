const { Joi } = require('celebrate');
const Boom = require('boom');

const { createQuestion } = require('../../db/questions');
const { findBucket } = require('../../db/buckets');
const { findUser } = require('../../db/users');

const coordsValidation = Joi.object({
  x: Joi.number().required(),
  y: Joi.number().required(),
}).optional().default({ x: 0, y: 0 });

const createQuestionValidation = {
  body: Joi.object({
    userProfileId: Joi.string().optional(),
    bucketId: Joi.string().optional(),
    bucketVideoId: Joi.string().optional(),
    text: Joi.string().required(),
    coords: coordsValidation,
  }),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const createQuestionRoute = async (req, res, next) => {
  const { context: { userId }, body } = req;

  const targetId = body.userProfileId || body.bucketId || body.bucketVideoId;

  let targetCreatorId;
  if (body.userProfileId) {
    const userProfile = await findUser({ _id: targetId });
    targetCreatorId = userProfile?.id;
  } else if (body.bucketId) {
    const bucket = await findBucket({ _id: targetId });
    targetCreatorId = bucket?.creatorId;
  } else if (body.bucketVideoId) {
    const bucket = await findBucket({ 'videos._id': targetId });
    targetCreatorId = bucket?.creatorId;
  }

  if (!targetCreatorId) {
    return next(Boom.notFound());
  }
  if ((typeof targetCreatorId === 'string' && targetCreatorId === userId) || targetCreatorId.equals?.(userId)) {
    return next(Boom.forbidden());
  }

  const question = await createQuestion({
    ...body,
    creatorId: userId,
  });
  return res.send(question);
};

module.exports = { createQuestionRoute, createQuestionValidation, coordsValidation };
