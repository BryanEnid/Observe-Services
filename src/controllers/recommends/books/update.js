const { Joi } = require('celebrate');
const Boom = require('boom');

const { findBook, updateBook } = require('../../../db/books');

const updateBookValidation = {
  body: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    readingTime: Joi.string().optional(),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateBookRoute = async (req, res, next) => {
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

  const updatedBook = await updateBook({ _id: id, creatorId: userId }, body);
  return res.send(updatedBook);
};

module.exports = { updateBookRoute, updateBookValidation };
