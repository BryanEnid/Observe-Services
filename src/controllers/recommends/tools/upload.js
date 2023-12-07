const Boom = require('boom');
const config = require('config');

const { getFileNameFromUrl, deleteObject } = require('../../../utils/s3');
const { findTool, updateTool } = require('../../../db/tools');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const uploadToolLogoRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id },
    file,
  } = req;

  if (!file?.location) {
    return next(Boom.badData('Picture is missed'));
  }

  try {
    const existingTool = await findTool({ _id: id });
    if (!existingTool) {
      await deleteObject(file.key);
      return next(Boom.notFound('Tool not found'));
    }

    if (!existingTool.creatorId.equals(userId)) {
      await deleteObject(file.key);
      return next(Boom.forbidden());
    }

    const isInternalFile = existingTool.picture.includes(config.get('fileStorage.s3Bucket'));
    if (isInternalFile) {
      await deleteObject(getFileNameFromUrl(existingTool.picture));
    }

    const updatedTool = await updateTool(
      { _id: id, creatorId: userId },
      {
        $set: { picture: file.location },
      },
    );
    return res.send(updatedTool);
  } catch (err) {
    await deleteObject(file.key);
    return next(err);
  }
};

module.exports = { uploadToolLogoRoute };
