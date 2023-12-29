const { Joi } = require('celebrate');
const Boom = require('boom');

const { updateQuestion, findQuestion } = require('../../db/questions');
const { coordsValidation } = require('./create');

const updateQuestionValidation = {
  body: Joi.object({
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
const updateQuestionRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { questionId },
    body
  } = req;

  const existing = await findQuestion({ creatorId: userId });
  if (!existing) {
    return next(Boom.notFound());
  }

  const question = await updateQuestion(questionId, {
    ...body,
    creatorId: userId,
  });
  return res.send(question);
};

module.exports = { updateQuestionRoute, updateQuestionValidation };
