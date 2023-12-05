const axios = require('axios');
const Boom = require('boom');
const { Joi } = require('celebrate');
const { JSDOM } = require('jsdom');
const { logger } = require('../../utils/logger');

const getEmojisListValidator = {
  query: Joi.object({
    search: Joi.string().required(),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const getEmojisListRoute = async (req, res, next) => {
  const { query: { search } } = req;

  try {
    const { data } = await axios.get(`https://slackmojis.com/emojis/search?utf8=%E2%9C%93&query=${search}`);

    const dom = new JSDOM(data);
    const emojis = dom.window.document.querySelectorAll('.emojis .emoji');

    const result = Array.prototype.map.call(emojis, item => {
      const iconUrl = item.querySelector('img').src;
      const iconCode = item.querySelector('.name').textContent?.trim();

      return { iconCode, iconUrl };
    });

    return res.send(result);
  } catch (err) {
    logger().error(err);
    return next(Boom.internal(err.message));
  }
};

module.exports = { getEmojisListRoute, getEmojisListValidator };
