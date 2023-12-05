const mongoose = require('mongoose');
const schemaOptions = require('./common/schema-options');

const SkillSchema = new mongoose.Schema({
  label: { type: String, required: true },
  iconUrl: { type: String, required: false, default: '' },
  iconCode: { type: String, required: false, default: '' },
}, schemaOptions);

const CareerHistory = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  companyLogoUrl: {
    type: String,
    required: false,
    default: '',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
    default: null,
  },
  currentCompany: {
    type: Boolean,
    required: false,
    default: false,
  },
  bucketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bucket',
    required: false,
  },

}, schemaOptions);

const Certification = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  providerLogoUrl: {
    type: String,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
    default: null,
  },
}, schemaOptions);

const Attachment = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: true,
  },
  previewUrl: {
    type: String,
    required: false,
  },
}, schemaOptions);

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  about: {
    type: [String],
    required: false,
    default: [],
  },
  skills: {
    type: [SkillSchema],
    required: false,
    default: [],
  },
  careerHistory: {
    type: [CareerHistory],
    required: false,
    default: [],
  },
  certifications: {
    type: [Certification],
    required: false,
    default: [],
  },
  attachments: {
    type: [Attachment],
    required: false,
    default: [],
  },
}, schemaOptions);

const ProfileModel = mongoose.model('Profile', ProfileSchema);

module.exports = ProfileModel;
