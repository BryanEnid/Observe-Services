const path = require('path');
const fs = require('fs');
const Boom = require('boom');
const { Joi } = require('celebrate');

const { addVideo } = require('../../db/buckets');
const { combineVideo } = require('../../utils/process-video');
const { putObject } = require('../../utils/s3');

const uploadAndProcessValidation = {
  body: Joi.object({
    image: Joi.binary().required(),
    mainVideo: Joi.binary().required(),
    subVideo: Joi.binary().required(),
    chosen: Joi.boolean().optional().allow(null),
    selected: Joi.boolean().optional().allow(null),
  }).required(),
};

const removeFile = (path) => {
  return new Promise((res, rej) => {
    fs.unlink(path, (err) => {
      if (err) {
        rej(err);
      }
      res();
    });
  });
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const uploadAndProcessRoute = async (req, res, next) => {
  const {
    files,
    params: { id },
    body: data
  } = req;

  console.log('\n=== id: ', id);
  console.log('=== data: ', data);
  console.log('=== files: ', files);

  const mainVideo = files?.mainVideo?.[0];
  const subVideo = files?.mainVideo?.[0];
  const image = files?.image?.[0];
  if (!mainVideo || !subVideo) {
    return next(Boom.badData('Videos are missed'));
  }

  const mainVideoPath = path.join(process.cwd(), 'uploads', mainVideo.filename);
  const subVideoPath = path.join(process.cwd(), 'uploads', subVideo.filename);
  // TODO: upload directly to s3
  const imagePath = path.join(process.cwd(), 'uploads', subVideo.filename);

  const resFileName = await combineVideo(mainVideoPath, subVideoPath);
  const uploadResult = await putObject(
    fs.createReadStream(path.join(process.cwd(), 'uploads', resFileName)),
    resFileName
  );
  await Promise.all([
    removeFile(mainVideoPath),
    removeFile(subVideoPath),
    removeFile(imagePath)
  ]);

  console.log('=== uploadResult: ', uploadResult);
  // const chosen = !!data.chosen && data.chosen === 'true';
  // const selected = !!data.selected && data.selected === 'true';
  //
  // const updateBucket = await addVideo(id, {
  //   chosen,
  //   selected,
  //   image: image.location,
  //   videoUrl: video.location,
  // });
  // const newVideo = updateBucket.videos.find(
  //   ({ image: imageUrl, videoUrl }) => imageUrl === image.location && videoUrl === video.location
  // );

  return res.status(200).send({/*newVideo*/});
};

module.exports = { uploadAndProcessRoute, uploadAndProcessValidation };
