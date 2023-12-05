const { Joi } = require('celebrate');
const Boom = require('boom');

const { createProfile, findProfile } = require('../../db/profile');
const { createSkillObjectValidation } = require('./skills/create');
const { createCareerHistoryObjectValidation } = require('./careerHistory/create');
const { createCertificationObjectValidation } = require('./certifications/create');
const { updateAboutObjectValidation } = require('./about/update');

const createProfileValidation = {
  body: Joi.object({
    about: updateAboutObjectValidation.default([]),
    skills: Joi.array().items(
      createSkillObjectValidation.optional(),
    ).optional().default([]),
    careerHistory: Joi.array().items(
      createCareerHistoryObjectValidation.optional(),
    ).optional().default([]),
    certifications: Joi.array().items(
      createCertificationObjectValidation.optional(),
    ).optional().default([]),
    attachments: Joi.array().items(
      Joi.object({
        fileUrl: Joi.string().required(),
        previewUrl: Joi.string().optional(),
      }).optional(),
    ).optional().default([]),
  }),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const createProfileRoute = async (req, res, next) => {
  const { context: { userId }, body } = req;

  const profile = await findProfile({ userId });
  if (profile) {
    return next(Boom.forbidden('Profile exists for this user'));
  }

  const newProfile = await createProfile({ ...body, userId });
  return res.send(newProfile);
};

module.exports = { createProfileRoute, createProfileValidation };
