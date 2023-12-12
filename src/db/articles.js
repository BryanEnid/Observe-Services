const { ArticleModel } = require('../models');

/**
 * @param {{ creatorId?: string }} query Creator ID
 * @return {Promise<ArticleModel[]>}
 */
const getArticlesList = async (query) => ArticleModel.find(query);

/**
 * @param {FilterQuery<ArticleModel>} filterQuery filter options
 * @return {Promise<ArticleModel>}
 */
const findArticle = async (filterQuery) => ArticleModel.findOne(filterQuery);

/**
 * @param {ArticleModel} data Article data
 * @return {Promise<ArticleModel>}
 */
const createArticle = (data) => {
  const article = new ArticleModel(data);

  return article.save();
};

/**
 * @param {FilterQuery<ArticleModel>} filter filter options
 * @param {UpdateQuery<ArticleModel>} data Article data
 * @param {QueryOptions?} opts
 * @return {Promise<ArticleModel>}
 */
const updateArticle = async (filter, data, opts) => ArticleModel.findOneAndUpdate(
  filter,
  data,
  { new: true, ...opts },
);

/**
 * @param {string} _id Article ID
 * @return {Promise<{ deletedCount: 1 }>} Promise with deleted count property
 */
const deleteArticle = (_id) => ArticleModel.deleteOne({ _id });

module.exports = {
  getArticlesList, findArticle, createArticle, updateArticle, deleteArticle,
};
