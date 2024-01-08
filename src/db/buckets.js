const { BucketModel } = require('../models');
const { populateWithProcesses } = require('./video-processes');

/**
 * @param {FilterQuery<BucketModel>} query Bucket ID
 * @param {QueryOptions?} opts Query options
 * @return {Promise<BucketModel[]>}
 */
const getBucketsList = async (query, opts) => {
  const buckets = await BucketModel.find(query, undefined, opts);
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
 * @param {FilterQuery} filterQuery filter options
 * @return {Promise<BucketModel>}
 */
const findBucket = async (filterQuery) => {
  const bucket = await BucketModel.findOne(filterQuery);
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
const updateBucketById = async (id, data) => populateWithProcesses(
  await BucketModel.findByIdAndUpdate(id, data, { new: true }),
);

/**
 * @param {FilterQuery} filter filter options
 * @param {UpdateQuery<BucketModel>} data Bucket data
 * @param {QueryOptions} opts
 * @return {Promise<BucketModel>}
 */
const updateBucket = async (filter, data, opts) => populateWithProcesses(
  await BucketModel.findOneAndUpdate(filter, data, { new: true, ...opts }),
);

/**
 * @param {FilterQuery} filter filter options
 * @param {UpdateQuery} data Bucket data
 * @param {QueryOptions?} opts
 * @return {Promise<
 *  acknowledged: Boolean;
 *  modifiedCount: Number;
 *  upsertedCount: Number;
 *  matchedCount: Number;
 * >}
 */
const updateBuckets = async (filter, data, opts) => populateWithProcesses(
  await BucketModel.updateMany(filter, data, { new: true, ...opts }),
);

const bulkUpdate = (updates) => BucketModel.bulkWrite(updates);

/**
 * @return {Promise<{ deletedCount: 1 }>} Promise with deleted count property
 * @param {string} _id Bucket ID
 */
const deleteBucket = (_id) => BucketModel.deleteOne({ _id });

/**
 * @param {FilterQuery} query Bucket query
 * @return {Promise<{ deletedCount: Number }>} Promise with deleted count property
 */
const deleteBucketsList = (query) => BucketModel.deleteMany(query);

const addVideo = (id, videoData) => updateBucketById(id, { $push: { videos: videoData } });

/**
 * @param {string} bucketId
 * @param {string} videoId
 * @param {{ coords: { x: Number, y: Number }, text: String, creatorId: String }} data
 * @return {Promise<BucketModel>}
 */
const createQuestion = (bucketId, videoId, data) => updateBucket(
  { _id: bucketId, 'videos._id': videoId },
  {
    $push: {
      'videos.$.questions': data,
    },
  },
);

/**
 * @param {string} bucketId
 * @param {string} videoId
 * @param {string} questionId
 * @param {{ coords: { x: Number, y: Number }, text: String }} data
 * @return {Promise<BucketModel>}
 */
const updateQuestion = (bucketId, videoId, questionId, data) => updateBucket(
  { _id: bucketId, 'videos._id': videoId, 'videos.questions._id': questionId },
  {
    $set: {
      'videos.$[video].questions.$[question].coords': data.coords,
      'videos.$[video].questions.$[question].text': data.text,
    },
  },
  { arrayFilters: [{ 'video._id': videoId }, { 'question._id': questionId }] },
);

/**
 * @param {string} bucketId
 * @param {string} videoId
 * @param {string} questionId
 * @return {Promise<BucketModel>}
 */
const deleteQuestion = (bucketId, videoId, questionId) => updateBucket(
  { _id: bucketId, 'videos._id': videoId, 'videos.questions._id': questionId },
  {
    $pull: {
      'videos.$[video].questions': { _id: questionId },
    },
  },
  { arrayFilters: [{ 'video._id': videoId }] },
);

/**
 * @param {string} bucketId
 * @param {string} videoId
 * @param {string} questionId
 * @param {{ coords: { x: Number, y: Number }, text: String }} data
 * @param {'questions' | 'polls'} subCollection
 * @return {Promise<BucketModel>}
 */
const createAnswer = (bucketId, videoId, questionId, data, subCollection = 'questions') => updateBucket(
  { _id: bucketId, 'videos._id': videoId, [`videos.${subCollection}._id`]: questionId },
  {
    $set: {
      [`videos.$[video].${subCollection}.$[question].answer`]: data,
    },
  },
  { arrayFilters: [{ 'video._id': videoId }, { 'question._id': questionId }] },
);

/**
 * @param {string} bucketId
 * @param {string} videoId
 * @param {string} questionId
 * @param {{ coords: { x: Number, y: Number }, text: String }} data
 * @param {'questions' | 'polls'} subCollection
 * @return {Promise<BucketModel>}
 */
const updateAnswer = (bucketId, videoId, questionId, data, subCollection = 'questions') => updateBucket(
  { _id: bucketId, 'videos._id': videoId, [`videos.${subCollection}._id`]: questionId },
  {
    $set: {
      [`videos.$[video].${subCollection}.$[question].answer.coords`]: data.coords,
      [`videos.$[video].${subCollection}.$[question].answer.text`]: data.text,
    },
  },
  { arrayFilters: [{ 'video._id': videoId }, { 'question._id': questionId }] },
);

/**
 * @param {string} bucketId
 * @param {string} videoId
 * @param {string} questionId
 * @param {'questions' | 'polls'} subCollection
 * @return {Promise<BucketModel>}
 */
const deleteAnswer = (bucketId, videoId, questionId, subCollection = 'questions') => updateBucket(
  { _id: bucketId, 'videos._id': videoId, [`videos.${subCollection}._id`]: questionId },
  {
    $set: {
      [`videos.$[video].${subCollection}.$[question].answer`]: null,
    },
  },
  { arrayFilters: [{ 'video._id': videoId }, { 'question._id': questionId }] },
);

/**
 * @param {string} bucketId
 * @param {string} videoId
 * @param {{
 *   coords: { x: Number, y: Number },
 *   text: String,
 *   options: String[],
 *   creatorId: String
 * }} data
 * @return {Promise<BucketModel>}
 */
const createPoll = (bucketId, videoId, data) => updateBucket(
  { _id: bucketId, 'videos._id': videoId },
  {
    $push: {
      'videos.$.polls': data,
    },
  },
);

/**
 * @param {string} bucketId
 * @param {string} videoId
 * @param {string} pollId
 * @param {{ coords: { x: Number, y: Number }, text: String }} data
 * @return {Promise<BucketModel>}
 */
const updatePoll = (bucketId, videoId, pollId, data) => updateBucket(
  { _id: bucketId, 'videos._id': videoId, 'videos.polls._id': pollId },
  {
    $set: {
      'videos.$[video].polls.$[poll].coords': data.coords,
      'videos.$[video].polls.$[poll].text': data.text,
    },
  },
  { arrayFilters: [{ 'video._id': videoId }, { 'poll._id': pollId }] },
);

/**
 * @param {string} bucketId
 * @param {string} videoId
 * @param {string} pollId
 * @return {Promise<BucketModel>}
 */
const deletePoll = (bucketId, videoId, pollId) => updateBucket(
  { _id: bucketId, 'videos._id': videoId, 'videos.polls._id': pollId },
  {
    $pull: {
      'videos.$[video].polls': { _id: pollId },
    },
  },
  { arrayFilters: [{ 'video._id': videoId }] },
);

module.exports = {
  getBucketsList,
  getBucketById,
  findBucket,
  createBucket,
  updateBucket,
  updateBucketById,
  updateBuckets,
  bulkUpdate,
  deleteBucket,
  deleteBucketsList,
  addVideo,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  createPoll,
  updatePoll,
  deletePoll,
};
