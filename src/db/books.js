const { BookModel } = require('../models');

/**
 * @param {{ creatorId?: string }} query Creator ID
 * @return {Promise<BookModel[]>}
 */
const getBooksList = async (query) => BookModel.find(query);

/**
 * @param {FilterQuery<BookModel>} filterQuery filter options
 * @return {Promise<BookModel>}
 */
const findBook = async (filterQuery) => BookModel.findOne(filterQuery);

/**
 * @param {BookModel} data Book data
 * @return {Promise<BookModel>}
 */
const createBook = (data) => {
  const bucket = new BookModel(data);

  return bucket.save();
};

/**
 * @param {FilterQuery<BookModel>} filter filter options
 * @param {UpdateQuery<BookModel>} data Book data
 * @param {QueryOptions?} opts
 * @return {Promise<BookModel>}
 */
const updateBook = async (filter, data, opts) => BookModel.findOneAndUpdate(
  filter,
  data,
  { new: true, ...opts },
);

/**
 * @param {string} _id Book ID
 * @return {Promise<{ deletedCount: 1 }>} Promise with deleted count property
 */
const deleteBook = (_id) => BookModel.deleteOne({ _id });

module.exports = {
  getBooksList, findBook, createBook, updateBook, deleteBook,
};
