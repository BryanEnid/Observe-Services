const { getPartialObj } = require('../utils/mongoose');
const { ProfileModel } = require('../models');

/**
 *
 * @param id
 * @return {Promise<ProfileModel>}
 */
const getProfileById = (id) => ProfileModel.findById(id);

/**
 * @param {FilterQuery<ProfileModel>} filterQuery filter options
 * @return {Promise<ProfileModel>}
 */
const findProfile = (filterQuery) => ProfileModel.findOne(filterQuery);

/**
 * @param {ProfileModel} data Profile data
 * @return {Promise<ProfileModel>}
 */
const createProfile = (data) => {
  const profile = new ProfileModel(data);
  return profile.save();
};

/**
 * @param {FilterQuery<ProfileModel>} filter filter options
 * @param {UpdateQuery<ProfileModel>} data Profile data
 * @param {QueryOptions?} opts
 * @return {Promise<ProfileModel>}
 */
const updateProfile = (filter, data, opts) => ProfileModel.findOneAndUpdate(
  filter,
  data,
  { new: true, ...opts },
);

/**
 * @param {String} profileId
 * @param {String[]} data
 * @return {Promise<ProfileModel>}
 */
const updateAbout = (profileId, data) => updateProfile(
  { _id: profileId },
  {
    $set: { about: data },
  },
);

const createSkill = (profileId, skill) => updateProfile(
  { _id: profileId },
  { $push: { skills: skill } },
);

const updateSkill = (profileId, skillId, data) => updateProfile(
  { _id: profileId, 'skills._id': skillId },
  {
    $set: getPartialObj(data, 'skills.$.'),
  },
);

const deleteSkill = (profileId, skillId) => updateProfile(
  { _id: profileId, 'skills._id': skillId },
  {
    $pull: {
      skills: { _id: skillId },
    },
  },
);

const createCareerHistory = (profileId, data) => updateProfile(
  { _id: profileId },
  { $push: { careerHistory: data } },
);

const updateCareerHistory = (profileId, historyId, data) => updateProfile(
  { _id: profileId, 'careerHistory._id': historyId },
  {
    $set: getPartialObj(data, 'careerHistory.$.'),
  },
);

const deleteCareerHistory = (profileId, historyId) => updateProfile(
  { _id: profileId, 'careerHistory._id': historyId },
  {
    $pull: {
      careerHistory: { _id: historyId },
    },
  },
);

const createCertification = (profileId, data) => updateProfile(
  { _id: profileId },
  { $push: { certifications: data } },
);

const updateCertification = (profileId, certificationsId, data) => updateProfile(
  { _id: profileId, 'certifications._id': certificationsId },
  {
    $set: getPartialObj(data, 'certifications.$.'),
  },
);

const deleteCertification = (profileId, certificationsId) => updateProfile(
  { _id: profileId, 'certifications._id': certificationsId },
  {
    $pull: {
      certifications: { _id: certificationsId },
    },
  },
);

/**
 *
 * @param {String} profileId
 * @param data
 * @return {Promise<ProfileModel>}
 */
const createAttachment = (profileId, data) => updateProfile(
  { _id: profileId },
  { $push: { attachments: data } },
);

/**
 *
 * @param {String} profileId
 * @param {String} attachmentId
 * @return {Promise<ProfileModel>}
 */
const deleteAttachment = (profileId, attachmentId) => updateProfile(
  { _id: profileId, 'attachments._id': attachmentId },
  {
    $pull: {
      attachments: { _id: attachmentId },
    },
  },
);

module.exports = {
  getProfileById,
  findProfile,
  createProfile,
  updateProfile,

  updateAbout,

  createSkill,
  updateSkill,
  deleteSkill,

  createCareerHistory,
  updateCareerHistory,
  deleteCareerHistory,

  createCertification,
  updateCertification,
  deleteCertification,

  createAttachment,
  deleteAttachment,
};
