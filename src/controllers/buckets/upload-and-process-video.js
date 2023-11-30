const path = require('path');
const fs = require('fs');
const Boom = require('boom');
const { Joi } = require('celebrate');
const { Types } = require('mongoose');

const { VIDEO_PROCESSING_STATUS } = require('../../constants');
const { combineVideo } = require('../../utils/process-video');
const { putObject, getFileUrl } = require('../../utils/s3');
const { castToBoolean } = require('../../utils/boolean');
const { logger } = require('../../utils/logger');
const { addVideo, findBucket } = require('../../db/buckets');
const { setProcess, removeProcess } = require('../../db/video-processes');

const uploadAndProcessValidation = {
  body: Joi.object({
    image: Joi.binary(),
    mainVideo: Joi.binary(),
    subVideo: Joi.binary(),
    chosen: Joi.boolean().optional().allow(null),
    selected: Joi.boolean().optional().allow(null),
    rounded: Joi.boolean().optional().default(false),
    mainSound: Joi.boolean().optional().default(true),
    subSound: Joi.boolean().optional().default(true),
  }).required(),
};

/**
 *
 * @param {String} filePath
 * @return {Promise<void>}
 */
const removeFile = (filePath) => new Promise((res, rej) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      return rej(err);
    }
    return res();
  });
});

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const uploadAndProcessRoute = async (req, res, next) => {
  const {
    files,
    context: { userId },
    params: { id },
    body: data,
  } = req;

  const mainVideo = files?.mainVideo?.[0];
  const subVideo = files?.subVideo?.[0];
  const image = files?.image?.[0];

  const mainVideoPath = path.join(process.cwd(), 'uploads', mainVideo?.filename);
  const subVideoPath = path.join(process.cwd(), 'uploads', subVideo?.filename);
  const imagePath = path.join(process.cwd(), 'uploads', image?.filename);

  const bucket = await findBucket({ _id: id, creatorId: userId });
  if (!bucket) {
    await Promise.all([
      removeFile(mainVideoPath),
      removeFile(subVideoPath),
      removeFile(imagePath),
    ]);
    return next(Boom.notFound(`Bucket ${id} not found`));
  }

  if (!mainVideo || !subVideo) {
    await Promise.all([
      removeFile(mainVideoPath),
      removeFile(subVideoPath),
      removeFile(imagePath),
    ]);
    return next(Boom.badData('Videos are missed'));
  }

  const chosen = castToBoolean(data.chosen);
  const selected = castToBoolean(data.selected);
  const rounded = castToBoolean(data.rounded);
  const mainSound = castToBoolean(data.mainSound);
  const subSound = castToBoolean(data.subSound);

  let resFilePath;
  let updateBucket;
  let newVideo;
  try {
    const imgUrl = getFileUrl(image.filename);
    await putObject(
      fs.createReadStream(imagePath),
      image.filename,
    );

    updateBucket = await addVideo(id, {
      chosen,
      selected,
      image: imgUrl,
      videoUrl: null,
      process: {
        status: VIDEO_PROCESSING_STATUS.PROCESSING,
        percent: 0,
      },
    });
    newVideo = updateBucket.videos.find(
      ({ image: imageUrl }) => imageUrl === imgUrl,
    );
    setProcess(newVideo.id, { percent: newVideo.process.percent });

    res.status(200).send(newVideo);

    const resFileName = await combineVideo(mainVideoPath, subVideoPath, {
      rounded,
      mainSound,
      subSound,
      outputFileName: `${Date.now().toString(16)}${new Types.ObjectId()}.mp4`,
      onProgress: (percent) => {
        if (newVideo.process.status !== VIDEO_PROCESSING_STATUS.PROCESSING) {
          return;
        }

        newVideo.process.percent = percent;
        setProcess(newVideo.id, { percent: -percent });
      },
    });
    resFilePath = path.join(process.cwd(), 'uploads', resFileName);

    newVideo.process.status = VIDEO_PROCESSING_STATUS.UPLOADING;
    newVideo.process.percent = 0;
    await updateBucket.save();
    setProcess(newVideo.id, { percent: newVideo.process.percent });

    await putObject(
      fs.createReadStream(resFilePath),
      resFileName,
      (percent) => {
        if (newVideo.process.status !== VIDEO_PROCESSING_STATUS.UPLOADING) {
          return;
        }

        newVideo.process.percent = percent;
        setProcess(newVideo.id, { percent });
      },
    );

    newVideo.process.status = VIDEO_PROCESSING_STATUS.DONE;
    newVideo.process.percent = 100;
    newVideo.videoUrl = getFileUrl(resFileName);
    await updateBucket.save();
  } catch (e) {
    logger().error(e);
    newVideo.process.status = VIDEO_PROCESSING_STATUS.ERROR;
    newVideo.process.errorMessage = e.message;
    updateBucket.save();
  } finally {
    removeProcess(newVideo.id);
    await Promise.all([
      removeFile(mainVideoPath),
      removeFile(subVideoPath),
      removeFile(imagePath),
      (resFilePath && removeFile(resFilePath)),
    ]);
  }

  return null;
};

module.exports = { uploadAndProcessRoute, uploadAndProcessValidation };
