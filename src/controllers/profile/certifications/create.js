const Boom = require('boom');
const { Joi } = require('celebrate');

const { findProfile, createCertification } = require('../../../db/profile');

const createCertificationObjectValidation = Joi.object({
  title: Joi.string().required(),
  provider: Joi.string().required(),
  providerLogoUrl: Joi.string().optional(),
  endDate: Joi.date().optional().default(null),
});

const createCertificationValidation = {
  body: createCertificationObjectValidation.required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const createCertificationRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id },
    body,
  } = req;

  const profile = await findProfile({ _id: id });
  if (!profile) {
    return next(Boom.notFound(`Profile ${id} not found`));
  }
  if (!profile.userId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedProfile = await createCertification(id, body);
  return res.send(updatedProfile);
};

module.exports = {
  createCertificationRoute,
  createCertificationValidation,
  createCertificationObjectValidation,
};
