const Boom = require('boom');
const { Joi } = require('celebrate');

const { DEFAULT_BUCKET_CATEGORY } = require('../../constants');
const { updateBuckets, deleteBucketsList, getBucketsList } = require('../../db/buckets');
const { getFileNameFromUrl, deleteObject } = require('../../utils/s3');

const deleteBucketsCategoryValidator = {
  query: Joi.object({
    withBuckets: Joi.boolean().optional(),
  }).optional(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const deleteBucketsCategoryRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { category },
    query: { withBuckets }
  } = req;

  const buckets = await getBucketsList({ creatorId: userId, category });
  if (!buckets.length) {
    return next(Boom.notFound(`Buckets category ${category} not found`));
  }

  if (withBuckets) {
    await Promise.all(
      buckets.map(bucket => {
        if (bucket.videos?.length) {
          return Promise.all(
            bucket.videos.reduce((acc, { image, videoUrl }) => ([
              ...acc,
              deleteObject(getFileNameFromUrl(image)),
              deleteObject(getFileNameFromUrl(videoUrl)),
            ]), []),
          );
        }

        return Promise.resolve();
      })
    );

    const { deletedCount } = await deleteBucketsList({ category });
    return res.send({ success: true, deletedCount });
  }

  const { modifiedCount } = await updateBuckets(
    { creatorId: userId, category },
    { $set: { category: DEFAULT_BUCKET_CATEGORY } }
  );
  return res.send({ success: true, modifiedCount });
};

module.exports = { deleteBucketsCategoryRoute, deleteBucketsCategoryValidator };
