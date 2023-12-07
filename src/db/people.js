const { PeopleModel } = require('../models');

/**
 * @param {{ creatorId?: string }} query Creator ID
 * @return {Promise<PeopleModel[]>}
 */
const getPeopleList = async (query) => PeopleModel.find(query);

/**
 * @param {FilterQuery<PeopleModel>} filterQuery filter options
 * @return {Promise<PeopleModel>}
 */
const findPeople = async (filterQuery) => PeopleModel.findOne(filterQuery);

/**
 * @param {PeopleModel} data People data
 * @return {Promise<PeopleModel>}
 */
const createPeople = (data) => {
  const bucket = new PeopleModel(data);

  return bucket.save();
};

/**
 * @param {FilterQuery<PeopleModel>} filter filter options
 * @param {UpdateQuery<PeopleModel>} data People data
 * @param {QueryOptions?} opts
 * @return {Promise<PeopleModel>}
 */
const updatePeople = async (filter, data, opts) => PeopleModel.findOneAndUpdate(
  filter,
  data,
  { new: true, ...opts },
);

/**
 * @param {string} _id People ID
 * @return {Promise<{ deletedCount: 1 }>} Promise with deleted count property
 */
const deletePeople = (_id) => PeopleModel.deleteOne({ _id });

module.exports = {
  getPeopleList, findPeople, createPeople, updatePeople, deletePeople,
};
