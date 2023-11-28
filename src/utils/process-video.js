const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');

const { logger } = require('./logger');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

/**
 * metadata should contain 'width', 'height' and 'display_aspect_ratio'
 * @param {string} url
 * @return Promise<any>
 */
const getVideoMetadata = (url) => new Promise((res, rej) => {
  ffmpeg.ffprobe(url, (err, metadata) => {
    if (err) {
      logger().error(err);
      return rej(err);
    }

    return res(metadata);
  });
});

/**
 * @param {Boolean} mainSound
 * @param {Boolean} subSound
 * @return {String[]}
 */
const getAudioOptions = (mainSound, subSound) => {
  if (mainSound && subSound) {
    return [
      '-filter_complex amerge=inputs=2', // merge audio from 2 videos
    ];
  }
  if (mainSound) {
    return [
      '-map 0:a', // use the Audio track of the main video
      '-disposition:a:0 default', // make sure that 1st Audio track in the output will be played as the default track
    ];
  }
  if (subSound) {
    return [
      '-map 1:a', // use the Audio track of the second video
      '-disposition:a:1 default', // make sure that 2nd Audio track in the output will be played as the default track
    ];
  }

  return [];
};

/**
 *
 * @param {string} backgroundVideoUrl
 * @param {string} subVideoUrl
 * @param {{
 *    rounded?: boolean,
 *    mainSound?: boolean,
 *    subSound?: boolean,
 *    outputFileName: string,
 *    onProgress: Function
 *  }} opts
 * @return {Promise<string>}
 */
const combineVideo = async (backgroundVideoUrl, subVideoUrl, opts) => {
  const { outputFileName } = opts;
  const rounded = typeof opts.rounded === 'boolean' ? opts.rounded : false;
  const mainSound = typeof opts.mainSound === 'boolean' ? opts.mainSound : true;
  const subSound = typeof opts.subSound === 'boolean' ? opts.subSound : true;
  const { onProgress } = opts;

  let totalTime = 0;
  let width = 1920;
  let height = 1080;

  const bgVideoMetadata = await getVideoMetadata(backgroundVideoUrl);
  const videoStreamMeta = bgVideoMetadata.streams.find((stream) => stream.codec_type === 'video');
  width = videoStreamMeta.width || width;
  height = videoStreamMeta.height || height;

  const subX = width / 4;
  const subY = height / 4;
  const subVideoPad = 50;
  const subVideoBorder = 5;

  return new Promise((res, rej) => {
    ffmpeg(backgroundVideoUrl)
      .input(subVideoUrl)
      .on('codecData', data => {
        totalTime = parseInt(data.duration.replace(/:/g, ''), 10);
      })
      .complexFilter([
        `[1:v]scale=${subX}:${subY}[1scaled]`,
        (rounded
          ? '[1scaled]format=yuva444p,geq=lum=\'p(X,Y)\':a=\'st(1,pow(min(W/2,H/2),2))+st(3,pow(X-(W/2),2)+pow(Y-(H/2),2));if(lte(ld(3),ld(1)),255,0)\'[1transformed]'
          : `[1scaled]pad=w=${subVideoBorder * 2}+iw:h=${subVideoBorder * 2}+ih:x=${subVideoBorder}:y=${subVideoBorder}:color=white[1transformed]`
        ),
        `[0:v][1transformed]overlay=shortest=1:x=${width - subX - subVideoPad}:y=${height - subY - subVideoPad}[output]`,
      ])
      .outputOptions([
        '-filter_complex_threads 1',
        ...getAudioOptions(mainSound, subSound),
        '-c:v libx264',
        '-preset ultrafast',
        '-shortest',
        '-map [output]',
      ])
      .output(`./uploads/${outputFileName}`)
      .on('progress', (e) => {
        if (typeof onProgress === 'function') {
          const currentTime = parseInt(e.timemark.replace(/:/g, ''), 10);
          const percent = (e?.percent || ((currentTime * 100) / totalTime)).toFixed(2);

          onProgress(percent >= 100 ? 99 : percent);
        }
      })
      .on('error', (err) => {
        rej(err);
      })
      .on('end', () => {
        if (typeof onProgress === 'function') {
          onProgress(100);
        }
        res(outputFileName);
      })
      .run();
  });
};

module.exports = { combineVideo };
