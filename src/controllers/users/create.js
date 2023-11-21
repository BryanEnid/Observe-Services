const { Joi } = require('celebrate');
const { createUser } = require('../../db/users');

const createUserValidation = {
	body: Joi.object({
		uid: Joi.string(),
		email: Joi.string().required(),
		name: Joi.string().required(),
		photoURL: Joi.string().required(),
		username: Joi.string().required(),
		providerData: Joi.array().items(
			Joi.object({
				displayName: Joi.string().required(),
				email: Joi.string(),
				phoneNumber: Joi.string().allow(null),
				photoURL: Joi.string().allow(null),
				providerId: Joi.string(),
				uid: Joi.string(),
			})
		).optional(),
		reloadUserInfo: Joi.object({
			createdAt: Joi.string(),
			displayName: Joi.string(),
			email: Joi.string(),
			emailVerified: Joi.boolean(),
			lastLoginAt: Joi.string(),
			lastRefreshAt: Joi.string().isoDate(),
			localId: Joi.string(),
			photoUrl: Joi.string().allow(null),
			providerUserInfo: Joi.array().items(
				Joi.object({
					displayName: Joi.string(),
					email: Joi.string(),
					federatedId: Joi.string(),
					photoUrl: Joi.string().allow(null),
					providerId: Joi.string(),
					rawId: Joi.string(),
				})
			),
			validSince: Joi.string()
		}).optional(),
	}).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const createUserRoute = async (req, res, next) => {
	const user = await createUser(req.body);
	return res.send(user);
};

module.exports = { createUserRoute, createUserValidation };
