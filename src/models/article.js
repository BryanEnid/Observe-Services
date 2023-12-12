const mongoose = require('mongoose');
const schemaOptions = require('./common/schema-options');

const ArticleSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: '',
  },
  description: {
    type: String,
    required: true,
    default: '',
  },
  picture: {
    type: String,
    required: false,
    default: '',
  },
  readingTime: {
    type: String,
    required: false,
    default: '',
  },
}, schemaOptions);

const ArticleModel = mongoose.model('Article', ArticleSchema);

module.exports = ArticleModel;
