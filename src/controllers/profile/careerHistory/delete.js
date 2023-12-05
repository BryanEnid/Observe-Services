const Boom = require('boom');

const { findProfile, deleteCareerHistory } = require('../../../db/profile');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const deleteCareerHistoryRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id, historyId },
  } = req;

  const profile = await findProfile({ _id: id, 'careerHistory._id': historyId });
  if (!profile) {
    return next(Boom.notFound('Profile or career history not found'));
  }
  if (!profile.userId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedProfile = await deleteCareerHistory(id, historyId);
  return res.send(updatedProfile);
};

module.exports = { deleteCareerHistoryRoute };
