const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

/**
 * metadata should contain 'width', 'height' and 'display_aspect_ratio'
 * @param {string} url
 * @return Promise<any>
 */
const getVideoMetadata = (url) => {
  return new Promise((res, rej) => {
    ffmpeg.ffprobe(url, (err, metadata) => {
      if (err) {
        console.error(err);
        return rej(err);
      }

      res(metadata);
    });
  });
};

/**
 *
 * @param {string} backgroundVideoUrl
 * @param {string} subVideoUrl
 * @return {Promise<string>}
 */
const combineVideo = async (backgroundVideoUrl, subVideoUrl) => {
  const outputFileName = `output-${Date.now()}.mp4`;
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
        console.log('=== codecData - data: ', data);
        totalTime = parseInt(data.duration.replace(/:/g, ''))
      })
      .complexFilter([
        // `[0:v]scale=${width}:${height}[0scaled]`,
        `[1:v]scale=${subX}:${subY}[1scaled]`,
        `[1scaled]format=yuva444p,geq=lum='p(X,Y)':a='st(1,pow(min(W/2,H/2),2))+st(3,pow(X-(W/2),2)+pow(Y-(H/2),2));if(lte(ld(3),ld(1)),255,0)'[1rounded]`,
        // `[1scaled]pad=w=${subVideoBorder * 2}+iw:h=${subVideoBorder * 2}+ih:x=${subVideoBorder}:y=${subVideoBorder}:color=white[1padded]`,
        // `[0scaled]pad=${x}:${y}[0padded]`,
        `[0:v][1rounded]overlay=shortest=1:x=${width - subX - subVideoPad}:y=${height - subY - subVideoPad}[output]`,

      ])
      .outputOptions([
        '-filter_complex_threads 1',
        // '-c:a copy',
        // '-map 0:a', // use the Audio track of the main video
        // '-map 0:a:0', // use the Audio track of the main video
        // '-disposition:a:0 default', // make sure that 1st Audio track in the output will be played as the default track
        // '-map 1:a', // add the 2nd Audio track in the output
        // '-map 1:a:0', // add the 2nd Audio track in the output
        // '-c:a copy',
        // '-c:a aac',
        '-filter_complex amerge=inputs=2', // merge audio from 2 videos
        '-c:v libx264',
        '-preset ultrafast',
        '-shortest',
        '-map [output]'
      ])
      .output(`./uploads/${outputFileName}`)
      .on('progress', (e) => {
        const currentTime = parseInt(e.timemark.replace(/:/g, ''));
        console.log('progress: ', (e?.percent || (currentTime * 100 / totalTime)).toFixed(2));
      })
      .on('error', (err) => {
        console.log('=== error ===');
        rej(err);
      })
      .on('end', () => {
        console.log('=== end ===');
        res(outputFileName);
      })
      .run();
  });
};

module.exports = { combineVideo };
