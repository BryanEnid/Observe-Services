const mongoose = require('mongoose');
const schemaOptions = require('./common/schema-options');

const ToolSchema = new mongoose.Schema({
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
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
    default: '',
  },
}, schemaOptions);

const ToolModel = mongoose.model('Tool', ToolSchema);

module.exports = ToolModel;
