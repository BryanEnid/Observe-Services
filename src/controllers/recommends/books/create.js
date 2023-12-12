const { Joi } = require('celebrate');

const { createBook } = require('../../../db/books');
const { photoObjectValidation } = require('./create-photo');

const createBookValidation = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    readingTime: Joi.string().required(),
    photos: Joi.array().items(
      Joi.object({
        ...photoObjectValidation,
      }).optional(),
    ).optional().default([]),
  }).required(),
};

const createBookRoute = async (req, res) => {
  const { context: { userId }, body } = req;

  const book = await createBook({ ...body, creatorId: userId });
  return res.send(book);
};

module.exports = { createBookRoute, createBookValidation };
