const Boom = require('boom');
const config = require('config');

const { findBook, updateBook } = require('../../../db/books');
const { getFileNameFromUrl, deleteObject } = require('../../../utils/s3');

const deleteBookPhotoRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id, photoId },
  } = req;

  const existingBook = await findBook({ _id: id, 'photos._id': photoId });
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

  const s3Bucket = config.get('fileStorage.s3Bucket');
  const isInternalFile = photo.imgUrl?.includes(s3Bucket);
  if (isInternalFile) {
    await deleteObject(getFileNameFromUrl(photo.imgUrl));
  }

  const updatedBook = await updateBook(
    { _id: id, creatorId: userId, 'photos._id': photoId },
    {
      $pull: {
        photos: {
          _id: photoId,
        },
      },
    },
  );
  return res.send(updatedBook);
};

module.exports = { deleteBookPhotoRoute };
