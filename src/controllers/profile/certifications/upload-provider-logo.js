const Boom = require('boom');

const { findProfile, updateCertification } = require('../../../db/profile');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const uploadProviderLogoRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id, certificationId },
    file,
  } = req;

  if (!file?.location) {
    return next(Boom.badData('Image is missed'));
  }

  const profile = await findProfile({ _id: id, 'certifications._id': certificationId });
  if (!profile) {
    return next(Boom.notFound('Profile or certification not found'));
  }
  if (!profile.userId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedProfile = await updateCertification(id, certificationId, {
    providerLogoUrl: file.location,
  });
  return res.send(updatedProfile);
};

module.exports = { uploadProviderLogoRoute };
