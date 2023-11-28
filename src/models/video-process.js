const mongoose = require('mongoose');

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
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      // eslint-disable-next-line no-param-reassign
      ret.id = ret._id;
      // eslint-disable-next-line no-param-reassign
      delete ret._id;
    },
  },
});

module.exports = { VideoProcessSchema };
