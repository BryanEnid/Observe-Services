const { Joi } = require('celebrate');
const { getBucketsList } = require('../../db/buckets');

const listRouteValidator = {
  query: Joi.object({
    ownerId: Joi.string().optional(),
  }).optional(),
};

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const getBucketsListRoute = async (req, res) => {
  const { query } = req;
  let options;
  if (query?.ownerId) {
    options = { creatorId: query.ownerId };
  }

  const user = await getBucketsList(options);
  return res.send(user);
};

module.exports = { getBucketsListRoute, listRouteValidator };
