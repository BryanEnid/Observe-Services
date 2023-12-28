const Boom = require('boom');

const { updateQuestion, findQuestion } = require('../../db/questions');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const upvoteQuestionRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { questionId },
  } = req;

  const existing = await findQuestion({ _id: questionId });
  if (!existing) {
    return next(Boom.notFound());
  }

  const voted = !!existing.votes.find(id => id.equals(userId));
  if (voted) {
    return res.send(existing);
  }

  const question = await updateQuestion(questionId, {
    $push: {
      votes: userId,
    },
  });
  return res.send(question);
};

module.exports = { upvoteQuestionRoute };
