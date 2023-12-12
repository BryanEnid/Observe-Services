const mongoose = require('mongoose');
const schemaOptions = require('./common/schema-options');

const SaveForLaterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    default: [],
  }],
}, schemaOptions);

const SaveForLaterModel = mongoose.model('SaveForLater', SaveForLaterSchema);

module.exports = SaveForLaterModel;
