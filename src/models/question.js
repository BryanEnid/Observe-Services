const mongoose = require('mongoose');
const schemaOptions = require('./common/schema-options');

const coords = {
  x: { type: Number, required: false, default: 0 },
  y: { type: Number, required: false, default: 0 }
};

const QuestionSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: false,
  },
  bucketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bucket',
    required: false,
  },
  bucketVideoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  coords,
  text: String,
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  answer: {
    type: {
      coords,
      text: String,
      videoUrl: {
        type: String,
        required: false,
      },
    },
    required: false,
    default: null,
  },
}, schemaOptions);

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;
