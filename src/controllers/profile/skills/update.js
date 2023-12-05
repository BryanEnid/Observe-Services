const Boom = require('boom');
const { Joi } = require('celebrate');

const { findProfile, updateSkill } = require('../../../db/profile');

const updateSkillObjectValidation = Joi.object({
  label: Joi.string().optional(),
  iconUrl: Joi.string().optional(),
  iconCode: Joi.string().optional(),
});

const updateSkillValidation = {
  body: updateSkillObjectValidation.required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateSkillRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id, skillId },
    body,
  } = req;

  const profile = await findProfile({ _id: id, 'skills._id': skillId });
  if (!profile) {
    return next(Boom.notFound('Profile or skill not found'));
  }
  if (!profile.userId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedProfile = await updateSkill(id, skillId, body);
  return res.send(updatedProfile);
};

module.exports = { updateSkillRoute, updateSkillValidation, updateSkillObjectValidation };
