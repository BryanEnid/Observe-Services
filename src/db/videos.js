const { VideoModel } = require('../models');

/**
 * @param {{ creatorId?: string }} query Creator ID
 * @return {Promise<VideoModel[]>}
 */
const getVideosList = async (query) => VideoModel.find(query);

/**
 * @param {FilterQuery<VideoModel>} filterQuery filter options
 * @return {Promise<VideoModel>}
 */
const findVideo = async (filterQuery) => VideoModel.findOne(filterQuery);

/**
 * @param {VideoModel} data Video data
 * @return {Promise<VideoModel>}
 */
const createVideo = (data) => {
  const bucket = new VideoModel(data);

  return bucket.save();
};

/**
 * @param {FilterQuery<VideoModel>} filter filter options
 * @param {UpdateQuery<VideoModel>} data Video data
 * @param {QueryOptions?} opts
 * @return {Promise<VideoModel>}
 */
const updateVideo = async (filter, data, opts) => VideoModel.findOneAndUpdate(
  filter,
  data,
  { new: true, ...opts },
);

/**
 * @param {string} _id Video ID
 * @return {Promise<{ deletedCount: 1 }>} Promise with deleted count property
 */
const deleteVideo = (_id) => VideoModel.deleteOne({ _id });

module.exports = {
  getVideosList, findVideo, createVideo, updateVideo, deleteVideo,
};
