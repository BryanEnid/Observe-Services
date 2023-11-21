const mongoose = require('mongoose');

const BucketSchema = new mongoose.Schema({
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
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	videos: [{
		image: String,
		videoUrl: String,
		chosen: { type: Boolean, required: false },
		selected: { type: Boolean, required: false },
	}],
}, {
	timestamps: true,
	toJSON: {
		virtuals: true,
		versionKey: false,
		transform: (doc, ret) => {
			ret.id = ret._id;
			delete ret._id;
		},
	},
});

const BucketModel = mongoose.model('Bucket', BucketSchema);

module.exports = BucketModel
