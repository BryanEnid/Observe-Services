const Boom = require('boom');

const { deleteBucket, getBucketById } = require('../../db/buckets');
const { getFileNameFromUrl, deleteObject } = require('../../utils/s3');

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const deleteBucketRoute = async (req, res, next) => {
	const { params: { id } } = req;

	const bucket = await getBucketById(id);
	if (!bucket) {
		return next(Boom.notFound(`bucket ${id} not found`));
	}

	if (bucket.videos?.length) {
		await Promise.all(
			bucket.videos.reduce((res, { image, videoUrl }) => {
				return [
					...res,
					deleteObject(getFileNameFromUrl(image)),
					deleteObject(getFileNameFromUrl(videoUrl)),
				];
			}, [])
		);
	}

	await deleteBucket(id);

	return res.send({ success: true });

};

module.exports = { deleteBucketRoute };
