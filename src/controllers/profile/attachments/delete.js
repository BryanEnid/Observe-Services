const Boom = require('boom');

const { getFileNameFromUrl } = require('../../../utils/s3');
const { findProfile, deleteAttachment } = require('../../../db/profile');
const { removeFiles } = require('./upload');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const deleteAttachmentRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id, attachmentId },
  } = req;

  const profile = await findProfile({ _id: id, 'attachments._id': attachmentId });
  if (!profile) {
    return next(Boom.notFound('Profile or attachment not found'));
  }
  if (!profile.userId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const attachment = profile.attachments.find(({ _id }) => _id.equals(attachmentId));
  await removeFiles([
    attachment?.fileUrl ? getFileNameFromUrl(attachment.fileUrl) : undefined,
    attachment?.previewUrl ? getFileNameFromUrl(attachment.previewUrl) : undefined,
  ]);
  const updatedProfile = await deleteAttachment(id, attachmentId);
  return res.send(updatedProfile);
};

module.exports = { deleteAttachmentRoute };
