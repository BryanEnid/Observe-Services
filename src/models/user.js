const mongoose = require('mongoose');
const schemaOptions = require('./common/schema-options');

const UserSchema = new mongoose.Schema({
  uid: String,
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: false,
  },
  providerData: [{
    displayName: String,
    email: String,
    phoneNumber: String,
    photoURL: String,
    providerId: String,
    uid: String,
  }],
  reloadUserInfo: {
    createdAt: String,
    displayName: String,
    email: String,
    emailVerified: Boolean,
    lastLoginAt: String,
    lastRefreshAt: String,
    localId: String,
    photoUrl: String,
    providerUserInfo: [{
      displayName: String,
      email: String,
      federatedId: String,
      photoUrl: String,
      providerId: String,
      rawId: String,
    }],
    validSince: String,
  },
}, schemaOptions);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
