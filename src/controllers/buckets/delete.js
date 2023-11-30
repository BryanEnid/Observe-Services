const Boom = require('boom');

const { deleteBucket, findBucket } = require('../../db/buckets');
const { getFileNameFromUrl, deleteObject } = require('../../utils/s3');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const deleteBucketRoute = async (req, res, next) => {
  const { context: { userId }, params: { id } } = req;

  const bucket = await findBucket({ _id: id, creatorId: userId });
  if (!bucket) {
    return next(Boom.notFound(`bucket ${id} not found`));
  }

  if (bucket.videos?.length) {
    await Promise.all(
      bucket.videos.reduce((acc, { image, videoUrl }) => ([
        ...acc,
        deleteObject(getFileNameFromUrl(image)),
        deleteObject(getFileNameFromUrl(videoUrl)),
      ]), []),
    );
  }

  await deleteBucket(id);

  return res.send({ success: true });
};

module.exports = { deleteBucketRoute };
