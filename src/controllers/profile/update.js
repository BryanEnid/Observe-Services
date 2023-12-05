const { Joi } = require('celebrate');
const Boom = require('boom');

const { updateProfile, findProfile } = require('../../db/profile');
const { updateSkillObjectValidation } = require('./skills/update');
const { updateCareerHistoryObjectValidation } = require('./careerHistory/update');
const { updateCertificationObjectValidation } = require('./certifications/update');
const { updateAboutObjectValidation } = require('./about/update');

const updateProfileValidation = {
  body: Joi.object({
    about: updateAboutObjectValidation,
    skills: Joi.array().items(
      updateSkillObjectValidation.optional(),
    ).optional(),
    careerHistory: Joi.array().items(
      updateCareerHistoryObjectValidation.optional(),
    ).optional(),
    certifications: Joi.array().items(
      updateCertificationObjectValidation.optional(),
    ).optional(),
    attachments: Joi.array().items(
      Joi.object({
        fileUrl: Joi.string().optional(),
        previewUrl: Joi.string().optional(),
      }).optional(),
    ).optional(),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateProfileRoute = async (req, res, next) => {
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

  const updatedProfile = await updateProfile({ _id: id, userId }, { $set: { ...body } });
  return res.send(updatedProfile);
};

module.exports = { updateProfileRoute, updateProfileValidation };
