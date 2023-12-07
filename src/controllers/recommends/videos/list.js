const { Joi } = require('celebrate');

const { getVideosList } = require('../../../db/videos');

const getVideosListValidation = {
  query: Joi.object({
    ownerId: Joi.string().optional(),
  }).optional(),
};

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const getVideosListRoute = async (req, res) => {
  const { query } = req;
  let options;
  if (query?.ownerId) {
    options = { creatorId: query.ownerId };
  }

  const videos = await getVideosList(options);
  return res.send(videos);
};

module.exports = { getVideosListRoute, getVideosListValidation };
