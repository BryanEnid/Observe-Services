const mongoose = require('mongoose');
const schemaOptions = require('./common/schema-options');

const PeopleSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
    default: '',
  },
}, schemaOptions);

const PeopleModel = mongoose.model('People', PeopleSchema);

module.exports = PeopleModel;
