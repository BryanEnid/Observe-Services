const Boom = require('boom');
const config = require('config');
const { Joi } = require('celebrate');

const { getFileNameFromUrl, deleteObject } = require('../../../utils/s3');
const { findBook, updateBook } = require('../../../db/books');

const uploadAndUpdatePhotoValidation = {
  body: Joi.object({
    description: Joi.string().optional().allow(null),
    photo: Joi.binary().optional(),
  }),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const uploadAndUpdatePhotoRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id, photoId },
    body: { description },
    file,
  } = req;

  if (!file?.location) {
    return next(Boom.badData('Picture is missed'));
  }

  try {
    const existingBook = await findBook({ _id: id });
    if (!existingBook) {
      await deleteObject(file.key);
      return next(Boom.notFound('Book not found'));
    }

    if (!existingBook.creatorId.equals(userId)) {
      await deleteObject(file.key);
      return next(Boom.forbidden());
    }

    const photo = existingBook.photos.find((oldPhoto) => oldPhoto._id.equals(photoId));
    if (!photo) {
      return next(Boom.notFound(`Photo ${photoId} not found`));
    }

    const s3Bucket = config.get('fileStorage.s3Bucket');
    const isInternalFile = photo.imgUrl?.includes(s3Bucket);
    if (isInternalFile) {
      await deleteObject(getFileNameFromUrl(photo.imgUrl));
    }

    const updatedBook = await updateBook(
      { _id: id, creatorId: userId, 'photos._id': photoId },
      {
        $set: {
          'photos.$.imgUrl': file.location,
          ...(description && { 'photos.$.description': description }),
        },
      },
    );
    return res.send(updatedBook);
  } catch (err) {
    await deleteObject(file.key);
    return next(err);
  }
};

module.exports = { uploadAndUpdatePhotoRoute, uploadAndUpdatePhotoValidation };
