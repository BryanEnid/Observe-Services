const Boom = require('boom');
const { Joi } = require('celebrate');
const { updateUser } = require('../../db/users');

const updateUserValidation = {
	body: Joi.object({
		uid: Joi.string(),
		email: Joi.string().optional(),
		name: Joi.string().optional(),
		photoURL: Joi.string().optional(),
		username: Joi.string().optional(),
		providerData: Joi.array().items(
			Joi.object({
				displayName: Joi.string().optional(),
				email: Joi.string(),
				phoneNumber: Joi.string(),
				photoURL: Joi.string(),
				providerId: Joi.string(),
				uid: Joi.string(),
			})
		).optional(),
		reloadUSerInfo: Joi.object({
			createdAt: Joi.string(),
			displayName: Joi.string(),
			email: Joi.string(),
			emailVerified: Joi.boolean(),
			lastLoginAt: Joi.string(),
			lastRefreshAt: Joi.string().isoDate(),
			localId: Joi.string(),
			photoUrl: Joi.string(),
			providerUserInfo: Joi.array().items(
				Joi.object({
					displayName: Joi.string(),
					email: Joi.string(),
					federatedId: Joi.string(),
					photoUrl: Joi.string(),
					providerId: Joi.string(),
					rawId: Joi.string(),
				})
			),
			validSince: Joi.string()
		}).optional(),
	}).required(),
};

/**
 *
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateUserRoute = async (req, res, next) => {
	const { params: { id } } = req;

	const user = await updateUser(id, req.body);
	if (!user) {
		return next(Boom.notFound(`User ${id} not found`));
	}

	return res.send(user);
};

module.exports = { updateUserRoute, updateUserValidation };
