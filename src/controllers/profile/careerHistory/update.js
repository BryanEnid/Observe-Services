const Boom = require('boom');
const { Joi } = require('celebrate');

const { findProfile, updateCareerHistory } = require('../../../db/profile');

const updateCareerHistoryObjectValidation = Joi.object({
  title: Joi.string().optional(),
  company: Joi.string().optional(),
  companyLogoUrl: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional().default(null),
  currentCompany: Joi.bool().optional().default(false),
  bucketId: Joi.string().optional(),
});

const updateCareerHistoryValidation = {
  body: updateCareerHistoryObjectValidation.required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateCareerHistoryRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id, historyId },
    body,
  } = req;

  const profile = await findProfile({ _id: id, 'careerHistory._id': historyId });
  if (!profile) {
    return next(Boom.notFound('Profile or career history not found'));
  }
  if (!profile.userId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const updatedProfile = await updateCareerHistory(id, historyId, body);
  return res.send(updatedProfile);
};

module.exports = {
  updateCareerHistoryRoute,
  updateCareerHistoryValidation,
  updateCareerHistoryObjectValidation,
};
