const Boom = require('boom');

const { getUserById } = require('../db/users');

const authMiddleware = () => {
	return async (req, res, next) => {
		const authorization = req.headers.authorization || '';
		if (!authorization) {
			return next(Boom.unauthorized());
		}

		const id = authorization.replace('Bearer ', '');
		const user = await getUserById(id.trim());
		if (!user) {
			return next(Boom.unauthorized());
		}

		req.context = {
			userId: id,
		};

		next();
	};
};

module.exports = { authMiddleware };
