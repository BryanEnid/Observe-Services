const { getArticlesList } = require('../../db/articles');
const { getBooksList } = require('../../db/books');
const { getPeopleList } = require('../../db/people');
const { getQuotesList } = require('../../db/quotes');
const { getToolsList } = require('../../db/tools');
const { getVideosList } = require('../../db/videos');

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const getRecommendsRoute = async (req, res) => {
  const { params: { userId } } = req;

  const filterQuery = { creatorId: userId };
  const [
    articles,
    books,
    people,
    quotes,
    tools,
    videos,
  ] = await Promise.all([
    getArticlesList(filterQuery),
    getBooksList(filterQuery),
    getPeopleList(filterQuery),
    getQuotesList(filterQuery),
    getToolsList(filterQuery),
    getVideosList(filterQuery),
  ]);
  return res.send({
    articles,
    books,
    people,
    quotes,
    tools,
    videos,
  });
};

module.exports = { getRecommendsRoute };
