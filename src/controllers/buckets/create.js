const { Joi } = require('celebrate');
const { createBucket } = require('../../db/buckets');

const createBucketValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    title: Joi.string().optional().allow(null, ''),
    description: Joi.any().required(),
    category: Joi.string().optional(),
    videos: Joi.array()
      .items(
        Joi.object({
          image: Joi.string().required(),
          videoUrl: Joi.string().required(),
          chosen: Joi.boolean().optional().allow(null),
          selected: Joi.boolean().optional().allow(null),
          description: Joi.string().optional().allow(null, ''),
          pollQuestions: Joi.boolean().optional(),
          views: Joi.number().optional(),
          contributors: Joi.array().items(Joi.string().optional()).optional(),
          videoType: Joi.string().optional(),
        })
      )
      .optional(),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const createBucketRoute = async (req, res) => {
  const {
    context: { userId },
    body,
  } = req;

  const bucket = await createBucket({
    ...body,
    creatorId: userId,
  });
  return res.send(bucket);
};

module.exports = { createBucketRoute, createBucketValidation };
