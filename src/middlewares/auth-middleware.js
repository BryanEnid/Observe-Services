const Boom = require('boom');

const { getUserById } = require('../db/users');

const authMiddleware = () => {
	return async (req, res, next) => {
		const authorization = req.headers.authorization || '';
		if (!authorization) {
			return next(Boom.unauthorized());
		}

		let user;
		try {
			const id = authorization.replace('Bearer ', '').trim();
			user = await getUserById(id);
		} catch {}

		if (!user) {
			return next(Boom.unauthorized());
		}

		req.context = {
			userId: user.id,
		};

		next();
	};
};

module.exports = { authMiddleware };
