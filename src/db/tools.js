const { ToolModel } = require('../models');

/**
 * @param {{ creatorId?: string }} query Creator ID
 * @return {Promise<ToolModel[]>}
 */
const getToolsList = async (query) => ToolModel.find(query);

/**
 * @param {FilterQuery<ToolModel>} filterQuery filter options
 * @return {Promise<ToolModel>}
 */
const findTool = async (filterQuery) => ToolModel.findOne(filterQuery);

/**
 * @param {ToolModel} data Tool data
 * @return {Promise<ToolModel>}
 */
const createTool = (data) => {
  const tool = new ToolModel(data);

  return tool.save();
};

/**
 * @param {FilterQuery<ToolModel>} filter filter options
 * @param {UpdateQuery<ToolModel>} data Tool data
 * @param {QueryOptions?} opts
 * @return {Promise<ToolModel>}
 */
const updateTool = async (filter, data, opts) => ToolModel.findOneAndUpdate(
  filter,
  data,
  { new: true, ...opts },
);

/**
 * @param {string} _id Tool ID
 * @return {Promise<{ deletedCount: 1 }>} Promise with deleted count property
 */
const deleteTool = (_id) => ToolModel.deleteOne({ _id });

module.exports = {
  getToolsList, findTool, createTool, updateTool, deleteTool,
};
