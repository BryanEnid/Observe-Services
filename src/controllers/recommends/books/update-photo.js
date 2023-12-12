const Boom = require('boom');
const config = require('config');
const { Joi } = require('celebrate');

const { getFileNameFromUrl, deleteObject } = require('../../../utils/s3');
const { findBook, updateBook } = require('../../../db/books');

const updateBookPhotoValidation = {
  body: Joi.object({
    description: Joi.string().optional().allow(null, ''),
    imgUrl: Joi.string().optional().allow(null),
  }),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateBookPhotoRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id, photoId },
    body: { description, imgUrl },
  } = req;

  const existingBook = await findBook({ _id: id });
  if (!existingBook) {
    return next(Boom.notFound('Book not found'));
  }

  if (!existingBook.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const photo = existingBook.photos.find((oldPhoto) => oldPhoto._id.equals(photoId));
  if (!photo) {
    return next(Boom.notFound(`Photo ${photoId} not found`));
  }

  if (imgUrl) {
    const s3Bucket = config.get('fileStorage.s3Bucket');
    const isInternalFile = photo.imgUrl?.includes(s3Bucket);
    if (isInternalFile) {
      await deleteObject(getFileNameFromUrl(photo.imgUrl));
    }
  }

  const updatedBook = await updateBook(
    { _id: id, creatorId: userId, 'photos._id': photoId },
    {
      $set: {
        ...(imgUrl && { 'photos.$.imgUrl': imgUrl }),
        ...(description && { 'photos.$.description': description }),
      },
    },
  );
  return res.send(updatedBook);
};

module.exports = { updateBookPhotoRoute, updateBookPhotoValidation };
