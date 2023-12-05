const Boom = require('boom');
const { Joi } = require('celebrate');

const { findProfile, updateCertification } = require('../../../db/profile');

const updateCertificationObjectValidation = Joi.object({
  title: Joi.string().optional(),
  provider: Joi.string().optional(),
  providerLogoUrl: Joi.string().optional(),
  endDate: Joi.date().optional().default(null),
});

const updateCertificationValidation = {
  body: updateCertificationObjectValidation.required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateCertificationRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id, certificationId },
    body,
  } = req;

  const profile = await findProfile({ _id: id, 'certifications._id': certificationId });
  if (!profile) {
    return next(Boom.notFound('Profile or certification not found'));
  }
  if (!profile.userId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedProfile = await updateCertification(id, certificationId, body);
  return res.send(updatedProfile);
};

module.exports = {
  updateCertificationRoute,
  updateCertificationValidation,
  updateCertificationObjectValidation,
};
