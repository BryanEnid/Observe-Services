const Boom = require('boom');

const { findProfile, deleteCertification } = require('../../../db/profile');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const deleteCertificationRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id, certificationId },
  } = req;

  const profile = await findProfile({ _id: id, 'certifications._id': certificationId });
  if (!profile) {
    return next(Boom.notFound('Profile or certification not found'));
  }
  if (!profile.userId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedProfile = await deleteCertification(id, certificationId);
  return res.send(updatedProfile);
};

module.exports = { deleteCertificationRoute };
