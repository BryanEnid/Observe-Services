const Boom = require('boom');
const config = require('config');

const { findBook, deleteBook } = require('../../../db/books');
const { getFileNameFromUrl, deleteObject } = require('../../../utils/s3');

const deleteBookRoute = async (req, res, next) => {
  const { context: { userId }, params: { id } } = req;

  const existingBook = await findBook({ _id: id });
  if (!existingBook) {
    return next(Boom.notFound('Book not found'));
  }
  if (!existingBook.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const s3Bucket = config.get('fileStorage.s3Bucket');
  await Promise.all(
    existingBook.photos.map(({ imgUrl }) => {
      if (imgUrl.includes(s3Bucket)) {
        return deleteObject(getFileNameFromUrl(imgUrl));
      }
      return Promise.resolve();
    }),
  );

  await deleteBook(id);
  return res.send({ success: true });
};

module.exports = { deleteBookRoute };
