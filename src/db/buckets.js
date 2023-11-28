const { BucketModel } = require('../models');
const { populateWithProcesses } = require('./video-processes');

/**
 * @param {{ creatorId?: string }} query Bucket ID
 * @return {Promise<BucketModel[]>}
 */
const getBucketsList = async (query) => {
  const buckets = await BucketModel.find(query);
  return buckets.map(populateWithProcesses);
};

/**
 * @param {string} id Bucket ID
 * @return {Promise<BucketModel>}
 */
const getBucketById = async (id) => {
  const bucket = await BucketModel.findById(id);
  return populateWithProcesses(bucket);
};

/**
 * @param {BucketModel} data Bucket data
 * @return {Promise<BucketModel>}
 */
const createBucket = (data) => {
  const bucket = new BucketModel(data);

  return bucket.save();
};

/**
 * @param {string} id Bucket ID
 * @param {UpdateQuery<BucketModel>} data Bucket data
 * @return {Promise<BucketModel>}
 */
const updateBucket = async (id, data) => populateWithProcesses(
  await BucketModel.findByIdAndUpdate(id, data, { new: true }),
);

/**
 * @return {Promise<{ deletedCount: 1 }>} Promise with deleted count property
 * @param {string} _id Bucket ID
 */
const deleteBucket = (_id) => BucketModel.deleteOne({ _id });

const addVideo = (id, videoData) => updateBucket(id, { $push: { videos: videoData } });

module.exports = {
  getBucketsList,
  getBucketById,
  createBucket,
  updateBucket,
  deleteBucket,
  addVideo,
};
