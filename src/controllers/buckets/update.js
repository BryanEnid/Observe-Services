const { Joi } = require('celebrate');
const Boom = require('boom');

const { findBucket, bulkUpdate } = require('../../db/buckets');
const { deleteObject, getFileNameFromUrl } = require('../../utils/s3');
const { getPartialObj } = require('../../utils/mongoose');

const updateBucketValidation = {
  body: Joi.object({
    id: Joi.string().optional(),
    creatorId: Joi.string().optional(),
    name: Joi.string().optional(),
    title: Joi.string().optional().allow(null, ''),
    description: Joi.any().optional(),
    category: Joi.string().optional(),
    videos: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          image: Joi.string().optional(),
          videoUrl: Joi.string().optional(),
          chosen: Joi.boolean().optional().allow(null),
          selected: Joi.boolean().optional().allow(null),
          description: Joi.string().optional().allow(null, ''),
          pollQuestions: Joi.boolean().optional(),
          views: Joi.number().optional(),
          contributors: Joi.array().items(Joi.string().optional()).optional(),
          videoType: Joi.string().optional().allow(null, ''),
        })
      )
      .optional()
      .allow(null),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateBucketRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id },
    body: {
      id: _id, creatorId, videos, ...data
    },
  } = req;

  const bucket = await findBucket({ _id: id, creatorId: userId });
  if (!bucket) {
    return next(Boom.notFound(`Bucket ${id} not found`));
  }

  let videoToDelete;
  if (videos && Array.isArray(videos)) {
    videoToDelete = bucket.videos?.filter(
      ({ id: existingVideoId }) => !videos?.find(({ id: videoId }) => existingVideoId === videoId)
    );
    if (videoToDelete?.length) {
      await Promise.all(
        videoToDelete.reduce(
          (acc, { image, videoUrl }) => [
            ...acc,
            ...(image ? [deleteObject(getFileNameFromUrl(image))] : []),
            ...(videoUrl ? [deleteObject(getFileNameFromUrl(videoUrl))] : []),
          ],
          []
        )
      );
    }
  }

  await bulkUpdate([
    {
      updateOne: {
        filter: { _id: id },
        update: {
          $set: { ...data },
          ...(videoToDelete?.length && {
            $pull: { videos: { _id: { $in: videoToDelete?.map(({ id: videoId }) => videoId) } } },
          }),
        },
      },
    },
    ...(videos || []).map((video) => ({
      updateOne: {
        filter: { _id: id, 'videos._id': video.id },
        update: {
          $set: getPartialObj(video, 'videos.$.', ['questions', 'polls', 'id']),
        },
      },
    })),
  ]);

  const updatedBucket = await findBucket({ _id: id, creatorId: userId });
  return res.send(updatedBucket);
};

module.exports = { updateBucketRoute, updateBucketValidation };
