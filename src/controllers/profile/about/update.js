const Boom = require('boom');
const { Joi } = require('celebrate');

const { findProfile, updateAbout } = require('../../../db/profile');

const updateAboutObjectValidation = Joi.array().items(Joi.string().optional()).optional();

const updateAboutValidation = {
  body: updateAboutObjectValidation,
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateAboutRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id },
    body,
  } = req;

  const profile = await findProfile({ _id: id });
  if (!profile) {
    return next(Boom.notFound('Profile not found'));
  }
  if (!profile.userId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedProfile = await updateAbout(id, body);
  return res.send(updatedProfile);
};

module.exports = {
  updateAboutRoute,
  updateAboutValidation,
  updateAboutObjectValidation,
};
