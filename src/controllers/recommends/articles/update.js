const { Joi } = require('celebrate');
const Boom = require('boom');

const { logger } = require('../../../utils/logger');
const { getArticleMeta } = require('../../../services/articles');
const { findArticle, updateArticle } = require('../../../db/articles');

const updateArticleValidation = {
  body: Joi.object({
    url: Joi.string().required(),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateArticleRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id },
    body: { url },
  } = req;

  const existingArticle = await findArticle({ _id: id });
  if (!existingArticle) {
    return next(Boom.notFound('Article not found'));
  }
  if (!existingArticle.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  try {
    const data = await getArticleMeta(url);
    if (!data?.title) {
      return next(Boom.badData('Article does not exist'));
    }

    const updatedArticle = await updateArticle(
      { _id: id, creatorId: userId },
      {
        $set: { ...data, videoUrl: url },
      },
    );
    return res.send(updatedArticle);
  } catch (err) {
    logger().error(err);
    return next(Boom.internal(err.message));
  }
};

module.exports = { updateArticleRoute, updateArticleValidation };
