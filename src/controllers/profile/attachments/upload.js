const Boom = require('boom');

const { deleteObject } = require('../../../utils/s3');
const { findProfile, createAttachment } = require('../../../db/profile');

const removeFiles = async (filesNames) => Promise.all(
  filesNames.reduce((acc, fileName) => {
    if (fileName) {
      acc.push(deleteObject(fileName));
    }

    return acc;
  }, []),
);

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const uploadAttachmentRoute = async (req, res, next) => {
  const {
    files,
    context: { userId },
    params: { id },
  } = req;

  const file = files?.file?.[0];
  const preview = files?.preview?.[0];

  if (!file) {
    await removeFiles([preview?.key]);
    return next(Boom.badData('File document is missed'));
  }

  const profile = await findProfile({ _id: id });
  if (!profile) {
    await removeFiles([file.key, preview?.key]);
    return next(Boom.notFound(`Profile ${id} not found`));
  }
  if (!profile.userId.equals(userId)) {
    await removeFiles([file.key, preview?.key]);
    return next(Boom.forbidden());
  }

  const updatedProfile = await createAttachment(id, {
    fileUrl: file.location,
    previewUrl: preview.location,
  });
  return res.send(updatedProfile);
};

module.exports = { uploadAttachmentRoute, removeFiles };
