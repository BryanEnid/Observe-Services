const Boom = require('boom');
const { Joi } = require('celebrate');

const { deleteObject } = require('../../utils/s3');
const { addVideo, findBucket } = require('../../db/buckets');

const uploadVideoValidation = {
  body: Joi.object({
    image: Joi.binary().required(),
    video: Joi.binary().required(),
    chosen: Joi.boolean().optional().allow(null),
    selected: Joi.boolean().optional().allow(null),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const uploadVideoRoute = async (req, res, next) => {
  const {
    files,
    context: { userId },
    params: { id },
    body: data,
  } = req;

  const video = files?.video?.[0];
  const image = files?.image?.[0];
  if (!video || !image) {
    return next(Boom.badData('Video or image are missed'));
  }

  const bucket = await findBucket({ _id: id, creatorId: userId });
  if (!bucket) {
    await deleteObject(video.key);
    await deleteObject(image.key);
    return next(Boom.notFound(`Bucket ${id} not found`));
  }

  const chosen = !!data.chosen && data.chosen === 'true';
  const selected = !!data.selected && data.selected === 'true';

  const updateBucket = await addVideo(id, {
    chosen,
    selected,
    image: image.location,
    videoUrl: video.location,
  });
  const newVideo = updateBucket.videos.find(
    ({ image: imageUrl, videoUrl }) => imageUrl === image.location && videoUrl === video.location
  );

  return res.status(200).send(newVideo);
};

module.exports = { uploadVideoRoute, uploadVideoValidation };
