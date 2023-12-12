const Boom = require('boom');
const { Joi } = require('celebrate');

const { deleteObject } = require('../../../utils/s3');
const { findBook, updateBook } = require('../../../db/books');

const uploadAndCreatePhotoValidation = {
  body: Joi.object({
    description: Joi.string().optional().allow(null, '').default(''),
    photo: Joi.binary().optional(),
  }),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const uploadAndCreatePhotoRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id },
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

    const updatedBook = await updateBook(
      { _id: id, creatorId: userId },
      {
        $push: {
          photos: {
            imgUrl: file.location,
            ...(description && { description }),
          },
        },
      },
    );
    return res.send(updatedBook);
  } catch (err) {
    await deleteObject(file.key);
    return next(err);
  }
};

module.exports = { uploadAndCreatePhotoRoute, uploadAndCreatePhotoValidation };
