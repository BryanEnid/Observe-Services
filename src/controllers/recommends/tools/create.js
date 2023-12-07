const { Joi } = require('celebrate');
const { createTool } = require('../../../db/tools');

const createToolValidation = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    picture: Joi.string().optional().allow(null, ''),
  }).required(),
};

const createToolRoute = async (req, res) => {
  const { context: { userId }, body } = req;

  const tool = await createTool({ ...body, creatorId: userId });
  return res.send(tool);
};

module.exports = { createToolRoute, createToolValidation };
