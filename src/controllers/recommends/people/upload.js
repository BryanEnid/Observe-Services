const Boom = require('boom');
const config = require('config');

const { getFileNameFromUrl, deleteObject } = require('../../../utils/s3');
const { findPeople, updatePeople } = require('../../../db/people');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const uploadPeopleLogoRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id },
    file,
  } = req;

  if (!file?.location) {
    return next(Boom.badData('Picture is missed'));
  }

  try {
    const existingPeople = await findPeople({ _id: id });
    if (!existingPeople) {
      await deleteObject(file.key);
      return next(Boom.notFound('People not found'));
    }

    if (!existingPeople.creatorId.equals(userId)) {
      await deleteObject(file.key);
      return next(Boom.forbidden());
    }

    const isInternalFile = existingPeople.picture.includes(config.get('fileStorage.s3Bucket'));
    if (isInternalFile) {
      await deleteObject(getFileNameFromUrl(existingPeople.picture));
    }

    const updatedPeople = await updatePeople(
      { _id: id, creatorId: userId },
      {
        $set: { picture: file.location },
      },
    );
    return res.send(updatedPeople);
  } catch (err) {
    await deleteObject(file.key);
    return next(err);
  }
};

module.exports = { uploadPeopleLogoRoute };
