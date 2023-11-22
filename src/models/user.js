const mongoose = require('mongoose');

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

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
