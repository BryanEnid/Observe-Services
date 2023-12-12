const { SaveForLaterModel } = require('../models');

/**
 * @param {FilterQuery<SaveForLaterModel>} filterQuery filter options
 * @return {Promise<SaveForLaterModel>}
 */
const findOne = async (filterQuery) => SaveForLaterModel.findOne(filterQuery);

/**
 * @param {SaveForLaterModel} data Tool data
 * @return {Promise<SaveForLaterModel>}
 */
const createSaveForLater = (data) => {
  const saveForLater = new SaveForLaterModel(data);

  return saveForLater.save();
};

/**
 * @param {FilterQuery<SaveForLaterModel>} filter filter options
 * @param {UpdateQuery<SaveForLaterModel>} data SaveForLater Object data
 * @param {QueryOptions?} opts
 * @return {Promise<SaveForLaterModel>}
 */
const updateSaveForLater = async (filter, data, opts) => SaveForLaterModel.findOneAndUpdate(
  filter,
  data,
  { new: true, ...opts },
);

module.exports = { findOne, createSaveForLater, updateSaveForLater };
