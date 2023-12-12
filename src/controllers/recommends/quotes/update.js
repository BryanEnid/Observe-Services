const { Joi } = require('celebrate');
const Boom = require('boom');

const { findQuot, updateQuot } = require('../../../db/quotes');

const updateQuotValidation = {
  body: Joi.object({
    text: Joi.string().required(),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateQuotRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id },
    body,
  } = req;

  const existingQuot = await findQuot({ _id: id });
  if (!existingQuot) {
    return next(Boom.notFound('Quot not found'));
  }
  if (!existingQuot.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedQuot = await updateQuot({ _id: id, creatorId: userId }, body);
  return res.send(updatedQuot);
};

module.exports = { updateQuotRoute, updateQuotValidation };
