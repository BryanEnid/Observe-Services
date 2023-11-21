const { getBucketById } = require('../../db/buckets');

/**
 * @param req: Request
 * @param res: Response
 * @return {Promise<void>}
 */
const getBucketByIdRoute = async (req, res) => {
	const { params: { id } } = req;

	const bucket = await getBucketById(id);
	return res.send(bucket);
};

module.exports = { getBucketByIdRoute };
