const { BucketModel } = require('../models');

/**
 * @param {{ creatorId?: string }} query Bucket ID
 * @return {Promise<BucketModel[]>}
 */
const getBucketsList = (query) => BucketModel.find(query);

/**
 * @param {string} id Bucket ID
 * @return {Promise<BucketModel>}
 */
const getBucketById = (id) => BucketModel.findById(id);

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
 * @param {BucketModel} data Bucket data
 * @return {Promise<BucketModel>}
 */
const updateBucket = (id, data) => BucketModel.findByIdAndUpdate(id, data, { new: true });

/**
 * @return {Promise<{ deletedCount: 1 }>} Promise with deleted count property
 * @param {string} _id Bucket ID
 */
const deleteBucket = (_id) => BucketModel.deleteOne({ _id });

module.exports = {
  getBucketsList, getBucketById, createBucket, updateBucket, deleteBucket,
};
