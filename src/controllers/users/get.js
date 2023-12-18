const Boom = require('boom');
const { findUser } = require('../../db/users');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const getUserByIdRoute = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  // findById
  const user = await findUser({ uid: id });
  if (!user) {
    return next(Boom.notFound(`User ${id} not found`));
  }

  return res.send(user);
};

module.exports = { getUserByIdRoute };
