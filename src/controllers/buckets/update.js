const { Joi } = require('celebrate');
const Boom = require('boom');

const { updateBucket, getBucketById } = require('../../db/buckets');
const { deleteObject, getFileNameFromUrl } = require('../../utils/s3');

const updateBucketValidation = {
  body: Joi.object({
    id: Joi.string(),
    creatorId: Joi.string(),
    name: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    videos: Joi.array().items(
      Joi.object({
        image: Joi.string().required(),
        videoUrl: Joi.string().required(),
        chosen: Joi.boolean().optional().allow(null),
        selected: Joi.boolean().optional().allow(null),
      }),
    ).optional(),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateBucketRoute = async (req, res, next) => {
  const { params: { id }, body: data } = req;

  const bucket = await getBucketById(id);
  if (!bucket) {
    return next(Boom.notFound(`Bucket ${id} not found`));
  }

  const videoToDelete = bucket.videos?.filter(
    ({ image, videoUrl }) => !data.videos.find(
      ({ image: updatedImage, videoUrl: updatedVideo }) => (
        image === updatedImage && videoUrl === updatedVideo
      ),
    ),
  );
  if (videoToDelete?.length) {
    await Promise.all(
      videoToDelete.reduce((acc, { image, videoUrl }) => ([
        ...acc,
        deleteObject(getFileNameFromUrl(image)),
        deleteObject(getFileNameFromUrl(videoUrl)),
      ]), []),
    );
  }

  const updatedBucket = await updateBucket(id, req.body);

  return res.send(updatedBucket);
};

module.exports = { updateBucketRoute, updateBucketValidation };
