const Boom = require('boom');
const { findArticle, deleteArticle } = require('../../../db/articles');

const deleteArticleRoute = async (req, res, next) => {
  const { context: { userId }, params: { id } } = req;

  const existingArticle = await findArticle({ _id: id });
  if (!existingArticle) {
    return next(Boom.notFound('Article not found'));
  }
  if (!existingArticle.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  await deleteArticle(id);
  return res.send({ success: true });
};

module.exports = { deleteArticleRoute };
