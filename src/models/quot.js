const mongoose = require('mongoose');
const schemaOptions = require('./common/schema-options');

const QuotSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: { type: String, required: true },
}, schemaOptions);

const QuotModel = mongoose.model('Quot', QuotSchema);

module.exports = QuotModel;
