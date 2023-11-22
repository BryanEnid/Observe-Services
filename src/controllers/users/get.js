const Boom = require('boom');
const { getUserById } = require('../../db/users');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const getUserByIdRoute = async (req, res, next) => {
	const { params: { id } } = req;

	const user = await getUserById(id);
	if (!user) {
		return next(Boom.notFound(`User ${id} not found`));
	}

	return res.send(user);
};

module.exports = { getUserByIdRoute };
