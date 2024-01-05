const { Joi } = require('celebrate');
const { getAccessToken, getUserInfo } = require('../../services/linkedin');

const getUserValidator = {
  query: Joi.object({
    code: Joi.string().required(),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const getUserRoute = async (req, res) => {
  const { query: { code } } = req;

  const data = await getAccessToken(code);
  const user = await getUserInfo(data.access_token);

  res.send({ accessToken: data.access_token, user });
};

module.exports = { getUserRoute, getUserValidator };
