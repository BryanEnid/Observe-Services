const Boom = require('boom');

const { findProfile, deleteSkill } = require('../../../db/profile');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const deleteSkillRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id, skillId },
  } = req;

  const profile = await findProfile({ _id: id, 'skills._id': skillId });
  if (!profile) {
    return next(Boom.notFound('Profile or skill not found'));
  }
  if (!profile.userId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedProfile = await deleteSkill(id, skillId);
  return res.send(updatedProfile);
};

module.exports = { deleteSkillRoute };
