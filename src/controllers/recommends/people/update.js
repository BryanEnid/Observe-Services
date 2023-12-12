const { Joi } = require('celebrate');
const Boom = require('boom');
const config = require('config');

const { getFileNameFromUrl, deleteObject } = require('../../../utils/s3');
const { findPeople, updatePeople } = require('../../../db/people');

const updatePeopleValidation = {
  body: Joi.object({
    name: Joi.string().optional(),
    picture: Joi.string().optional().allow(null, ''),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updatePeopleRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id },
    body,
  } = req;

  const existingPeople = await findPeople({ _id: id });
  if (!existingPeople) {
    return next(Boom.notFound('People not found'));
  }
  if (!existingPeople.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const isInternalFile = existingPeople.picture.includes(config.get('fileStorage.s3Bucket'));
  if (existingPeople.picture && existingPeople.picture !== body.picture && isInternalFile) {
    await deleteObject(getFileNameFromUrl(existingPeople.picture));
  }

  const updatedPeople = await updatePeople({ _id: id, creatorId: userId }, body);
  return res.send(updatedPeople);
};

module.exports = { updatePeopleRoute, updatePeopleValidation };
