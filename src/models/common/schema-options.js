const schemaOptions = {
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
};

module.exports = schemaOptions;
