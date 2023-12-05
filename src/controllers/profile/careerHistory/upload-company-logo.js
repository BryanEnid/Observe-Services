const Boom = require('boom');

const { findProfile, updateCareerHistory } = require('../../../db/profile');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const uploadCareerLogoRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id, historyId },
    file,
  } = req;

  if (!file?.location) {
    return next(Boom.badData('Image is missed'));
  }

  const profile = await findProfile({ _id: id, 'careerHistory._id': historyId });
  if (!profile) {
    return next(Boom.notFound('Profile or career history not found'));
  }
  if (!profile.userId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedProfile = await updateCareerHistory(id, historyId, {
    companyLogoUrl: file.location,
  });
  return res.send(updatedProfile);
};

module.exports = { uploadCareerLogoRoute };
