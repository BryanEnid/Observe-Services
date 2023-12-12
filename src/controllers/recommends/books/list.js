const { Joi } = require('celebrate');

const { getBooksList } = require('../../../db/books');

const getBooksListValidation = {
  query: Joi.object({
    ownerId: Joi.string().optional(),
  }).optional(),
};

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const getBooksListRoute = async (req, res) => {
  const { query } = req;
  let options;
  if (query?.ownerId) {
    options = { creatorId: query.ownerId };
  }

  const books = await getBooksList(options);
  return res.send(books);
};

module.exports = { getBooksListRoute, getBooksListValidation };
