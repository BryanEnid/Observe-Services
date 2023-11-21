const { deleteUser } = require('../../db/users');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const deleteUserRoute = async (req, res, next) => {
	const { params: { id } } = req;

	const { deletedCount } = await deleteUser(id);
	if (!deletedCount) {
		return next(Boom.notFound(`User ${id} not found`));
	}

	return res.send({ success: true });
};

module.exports = { deleteUserRoute };
