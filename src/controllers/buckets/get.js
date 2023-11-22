const Boom = require('boom');
const { getBucketById } = require('../../db/buckets');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const getBucketByIdRoute = async (req, res, next) => {
  const { params: { id } } = req;

  const bucket = await getBucketById(id);
  if (!bucket) {
    return next(Boom.notFound(`Bucket ${id} not found`));
  }

  return res.send(bucket);
};

module.exports = { getBucketByIdRoute };
