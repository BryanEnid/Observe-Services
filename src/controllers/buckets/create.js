const { Joi } = require('celebrate');
const { createBucket } = require('../../db/buckets');

const createBucketValidation = {
	body: Joi.object({
		creatorId: Joi.string(),
		name: Joi.string().required(),
		title: Joi.string().required(),
		description: Joi.string().required(),
		videos: Joi.array().items(
			Joi.object({
				image: Joi.string().required(),
				videoUrl: Joi.string().required(),
				chosen: Joi.boolean().optional().allow(null),
				selected: Joi.boolean().optional().allow(null),
			})
		).optional(),
	}).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const createBucketRoute = async (req, res) => {
	const bucket = await createBucket(req.body);
	return res.send(bucket);
};

module.exports = { createBucketRoute, createBucketValidation };
