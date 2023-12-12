const { Joi } = require('celebrate');

const { getToolsList } = require('../../../db/tools');

const getToolsListValidation = {
  query: Joi.object({
    ownerId: Joi.string().optional(),
  }).optional(),
};

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const getToolsListRoute = async (req, res) => {
  const { query } = req;
  let options;
  if (query?.ownerId) {
    options = { creatorId: query.ownerId };
  }

  const tools = await getToolsList(options);
  return res.send(tools);
};

module.exports = { getToolsListRoute, getToolsListValidation };
