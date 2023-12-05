const Boom = require('boom');
const { Joi } = require('celebrate');

const { findProfile, createCareerHistory } = require('../../../db/profile');

const createCareerHistoryObjectValidation = Joi.object({
  title: Joi.string().required(),
  company: Joi.string().required(),
  companyLogoUrl: Joi.string().optional(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional().default(null),
  currentCompany: Joi.bool().optional().default(false),
  bucketId: Joi.string().optional(),
});

const createCareerHistoryValidation = {
  body: createCareerHistoryObjectValidation.required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const createCareerHistoryRoute = async (req, res, next) => {
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

  const updatedProfile = await createCareerHistory(id, body);
  return res.send(updatedProfile);
};

module.exports = {
  createCareerHistoryRoute,
  createCareerHistoryValidation,
  createCareerHistoryObjectValidation,
};
