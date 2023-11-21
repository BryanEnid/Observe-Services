const { getUsersList } = require('../../db/users');

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const getUsersListRoute = async (req, res) => {
	const user = await getUsersList();
	return res.send(user);
};

module.exports = { getUsersListRoute };
