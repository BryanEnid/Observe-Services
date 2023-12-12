const mongoose = require('mongoose');
const schemaOptions = require('./common/schema-options');

const VideoSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  duration: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: false,
    default: '',
  },
}, schemaOptions);

const PeopleModel = mongoose.model('Video', VideoSchema);

module.exports = PeopleModel;
