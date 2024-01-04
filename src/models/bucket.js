const mongoose = require('mongoose');

const { VideoProcessSchema } = require('./video-process');
const schemaOptions = require('./common/schema-options');

const BucketVideoSchema = new mongoose.Schema(
  {
    image: String,
    videoUrl: String,
    chosen: { type: Boolean, required: false },
    selected: { type: Boolean, required: false },
    process: { type: VideoProcessSchema, required: false },
    polls: [
      {
        creatorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        coords: { x: String, y: String },
        text: String,
        options: [{ text: String }],
        answer: {
          coords: { x: String, y: String },
          text: String,
        },
      },
    ],
    description: { type: String, required: false, default: '' },
    pollQuestions: { type: Boolean, required: false, default: false },
    views: { type: Number, required: false, default: 0 },
    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    videoType: { type: String, default: '' },
  },
  schemaOptions
);

const BucketSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    category: {
      type: String,
      default: 'Unlisted',
      // required: true,
    },
    videos: [BucketVideoSchema],
  },
  schemaOptions
);

const BucketModel = mongoose.model('Bucket', BucketSchema);

module.exports = BucketModel;
