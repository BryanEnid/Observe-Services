const { Joi } = require('celebrate');

const { getQuotesList } = require('../../../db/quotes');

const getQuotesListValidation = {
  query: Joi.object({
    ownerId: Joi.string().optional(),
  }).optional(),
};

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const getQuotesListRoute = async (req, res) => {
  const { query } = req;
  let options;
  if (query?.ownerId) {
    options = { creatorId: query.ownerId };
  }

  const quotes = await getQuotesList(options);
  return res.send(quotes);
};

module.exports = { getQuotesListRoute, getQuotesListValidation };
