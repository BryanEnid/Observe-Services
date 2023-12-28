const Boom = require('boom');
const { deleteQuestion, findQuestion } = require('../../db/questions');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const deleteQuestionRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { questionId },
  } = req;

  const question = await findQuestion({ _id: questionId });
  if (!question) {
    return next(Boom.notFound('Question not found'));
  }
  if (!question.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  await deleteQuestion(questionId);
  return res.send({ success: true });
};

module.exports = { deleteQuestionRoute };
