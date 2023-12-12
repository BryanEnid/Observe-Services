const { Joi } = require('celebrate');
const Boom = require('boom');
const { findBook, updateBook } = require('../../../db/books');

const photoObjectValidation = {
  description: Joi.string().optional().allow(null, '').default(''),
  imgUrl: Joi.string().required(),
};

const createBookPhotoValidation = {
  body: Joi.object({
    ...photoObjectValidation,
  }).required(),
};

const createBookPhotoRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id },
    body,
  } = req;

  const existingBook = await findBook({ _id: id });
  if (!existingBook) {
    return next(Boom.notFound('Book not found'));
  }
  if (!existingBook.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const book = await updateBook(
    { _id: id },
    {
      $push: {
        photos: { ...body },
      },
    },
  );
  return res.send(book);
};

module.exports = { createBookPhotoRoute, createBookPhotoValidation, photoObjectValidation };
