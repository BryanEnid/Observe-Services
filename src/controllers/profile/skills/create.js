const Boom = require('boom');
const { Joi } = require('celebrate');

const { findProfile, createSkill } = require('../../../db/profile');

const createSkillObjectValidation = Joi.object({
  label: Joi.string().required(),
  iconUrl: Joi.string().optional(),
  iconCode: Joi.string().optional(),
});

const createSkillValidation = {
  body: createSkillObjectValidation.required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const createSkillRoute = async (req, res, next) => {
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

  const updatedProfile = await createSkill(id, body);
  return res.send(updatedProfile);
};

module.exports = { createSkillRoute, createSkillValidation, createSkillObjectValidation };
