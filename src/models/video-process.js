const mongoose = require('mongoose');
const schemaOptions = require('./common/schema-options');

const VideoProcessSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
    default: 0,
  },
  errorMessage: {
    type: String,
    required: false,
  },
}, schemaOptions);

module.exports = { VideoProcessSchema };
