const { Joi } = require('celebrate');

const { getArticlesList } = require('../../../db/articles');

const getArticlesListValidation = {
  query: Joi.object({
    ownerId: Joi.string().optional(),
  }).optional(),
};

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const getArticlesListRoute = async (req, res) => {
  const { query } = req;
  let options;
  if (query?.ownerId) {
    options = { creatorId: query.ownerId };
  }

  const articles = await getArticlesList(options);
  return res.send(articles);
};

module.exports = { getArticlesListRoute, getArticlesListValidation };
