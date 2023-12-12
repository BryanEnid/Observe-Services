const Boom = require('boom');
const { Joi } = require('celebrate');

const { logger } = require('../../../utils/logger');
const { createArticle } = require('../../../db/articles');
const { getArticleMeta } = require('../../../services/articles');

const createArticleValidation = {
  body: Joi.object({
    url: Joi.string().required(),
  }).required(),
};

const createArticleRoute = async (req, res, next) => {
  const { context: { userId }, body: { url } } = req;

  try {
    const data = await getArticleMeta(url);
    if (!data?.title) {
      return next(Boom.badData('Article does not exist'));
    }

    const article = await createArticle({ ...data, url, creatorId: userId });
    return res.send(article);
  } catch (err) {
    logger().error(err);
    return next(Boom.internal(err.message));
  }
};

module.exports = { createArticleRoute, createArticleValidation };
