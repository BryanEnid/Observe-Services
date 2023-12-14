const { UserModel } = require('../models');

const getUsersList = () => UserModel.find();

/**
 * @param {string} id User ID
 * @return {Promise<UserModel>}
 */
const getUserById = (id) => UserModel.findById(id);

/**
 * @param {FilterQuery<UserModel>} filterQuery filter options
 * @return {Promise<UserModel>}
 */
const findUser = async (filterQuery) => UserModel.findOne(filterQuery);

/**
 * @param {UserModel} data User data
 * @return {Promise<UserSchema>}
 */
const createUser = (data) => {
  const user = new UserModel(data);

  return user.save();
};

/**
 * @param {string} id User ID
 * @param {UserModel} data User data
 * @return {Promise<UserModel>}
 */
const updateUser = (id, data) => UserModel.findByIdAndUpdate(id, data, { new: true });

/**
 * @return {Promise<{ deletedCount: 1 }>} Promise with deleted count property
 * @param {string} _id User ID
 */
const deleteUser = (_id) => UserModel.deleteOne({ _id });

module.exports = {
  getUsersList, getUserById, findUser, createUser, updateUser, deleteUser,
};
