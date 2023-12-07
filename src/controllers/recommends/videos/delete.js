const Boom = require('boom');
const { findVideo, deleteVideo } = require('../../../db/videos');

const deleteVideoRoute = async (req, res, next) => {
  const { context: { userId }, params: { id } } = req;

  const existingVideo = await findVideo({ _id: id });
  if (!existingVideo) {
    return next(Boom.notFound('Video not found'));
  }
  if (!existingVideo.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  await deleteVideo(id);
  return res.send({ success: true });
};

module.exports = { deleteVideoRoute };
