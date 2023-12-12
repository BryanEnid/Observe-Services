const { Joi } = require('celebrate');
const { createQuot } = require('../../../db/quotes');

const createQuotValidation = {
  body: Joi.object({
    text: Joi.string().required(),
  }).required(),
};

const createQuotRoute = async (req, res) => {
  const { context: { userId }, body } = req;

  const quot = await createQuot({ ...body, creatorId: userId });
  return res.send(quot);
};

module.exports = { createQuotRoute, createQuotValidation };
