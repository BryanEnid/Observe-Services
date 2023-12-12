const { QuotModel } = require('../models');

/**
 * @param {{ creatorId?: string }} query Creator ID
 * @return {Promise<QuotModel[]>}
 */
const getQuotesList = async (query) => QuotModel.find(query);

/**
 * @param {FilterQuery<QuotModel>} filterQuery filter options
 * @return {Promise<QuotModel>}
 */
const findQuot = async (filterQuery) => QuotModel.findOne(filterQuery);

/**
 * @param {QuotModel} data Quot data
 * @return {Promise<QuotModel>}
 */
const createQuot = (data) => {
  const quot = new QuotModel(data);

  return quot.save();
};

/**
 * @param {FilterQuery<QuotModel>} filter filter options
 * @param {UpdateQuery<QuotModel>} data Quot data
 * @param {QueryOptions?} opts
 * @return {Promise<QuotModel>}
 */
const updateQuot = async (filter, data, opts) => QuotModel.findOneAndUpdate(
  filter,
  data,
  { new: true, ...opts },
);

/**
 * @param {string} _id Quot ID
 * @return {Promise<{ deletedCount: 1 }>} Promise with deleted count property
 */
const deleteQuot = (_id) => QuotModel.deleteOne({ _id });

module.exports = {
  getQuotesList, findQuot, createQuot, updateQuot, deleteQuot,
};
