const { Joi } = require('celebrate');

const { getPeopleList } = require('../../../db/people');

const getPeopleListValidation = {
  query: Joi.object({
    ownerId: Joi.string().optional(),
  }).optional(),
};

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const getPeopleListRoute = async (req, res) => {
  const { query } = req;
  let options;
  if (query?.ownerId) {
    options = { creatorId: query.ownerId };
  }

  const people = await getPeopleList(options);
  return res.send(people);
};

module.exports = { getPeopleListRoute, getPeopleListValidation };
