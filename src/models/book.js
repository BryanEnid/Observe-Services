const mongoose = require('mongoose');
const schemaOptions = require('./common/schema-options');

const PhotoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false,
    default: '',
  },
  imgUrl: {
    type: String,
    required: true,
  },
}, schemaOptions);

const BookSchema = new mongoose.Schema({
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
  },
  readingTime: {
    type: String,
    required: true,
  },
  photos: { type: [PhotoSchema], default: [] },
}, schemaOptions);

const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;
