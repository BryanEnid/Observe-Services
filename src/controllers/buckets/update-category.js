const Boom = require('boom');
const { Joi } = require('celebrate');

const { updateBuckets, getBucketsList } = require('../../db/buckets');
const { DEFAULT_BUCKET_CATEGORY } = require('../../constants');

const updateBucketsCategoryValidator = {
  body: Joi.object({
    label: Joi.string().required(),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateBucketsCategoryRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { category },
    body: { label }
  } = req;

  const queryOpts = {
    creatorId: userId,
    $or: [
      { category },
      ...(category === DEFAULT_BUCKET_CATEGORY ? [{ category: null }] : []),
    ],
  };
  const bucket = await getBucketsList(queryOpts);
  if (!bucket.length) {
    return next(Boom.notFound(`Buckets category ${category} not found`));
  }

  const { modifiedCount } = await updateBuckets(queryOpts, { $set: { category: label } });
  return res.send({ success: true, modifiedCount });
};

module.exports = { updateBucketsCategoryRoute, updateBucketsCategoryValidator };
