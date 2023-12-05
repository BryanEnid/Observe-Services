const Boom = require('boom');
const { getProfileById } = require('../../db/profile');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const getProfileByIdRoute = async (req, res, next) => {
  const { params: { id } } = req;

  const profile = await getProfileById(id);
  if (!profile) {
    return next(Boom.notFound(`Profile ${id} not found`));
  }

  return res.send(profile);
};

module.exports = { getProfileByIdRoute };
