// In memory state, for reduce Bucket.save() calls
const videoProcesses = {};

const setProcess = (id, value) => {
  videoProcesses[id] = { ...videoProcesses[id], ...value };
};

const getProcess = (id) => videoProcesses[id];

const removeProcess = (id) => delete videoProcesses[id];

const populateWithProcesses = (bucket) => {
  // eslint-disable-next-line no-param-reassign
  bucket.videos = bucket.videos.map(video => {
    if (video?.process && getProcess(video._id)) {
      video.process.set({ ...video.process, ...getProcess(video._id) });
    }
    return video;
  });

  return bucket;
};

module.exports = {
  setProcess, getProcess, removeProcess, populateWithProcesses,
};
