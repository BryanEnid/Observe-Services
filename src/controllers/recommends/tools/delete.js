const Boom = require('boom');
const config = require('config');

const { findTool, deleteTool } = require('../../../db/tools');
const { getFileNameFromUrl, deleteObject } = require('../../../utils/s3');

const deleteToolRoute = async (req, res, next) => {
  const { context: { userId }, params: { id } } = req;

  const existingTool = await findTool({ _id: id });
  if (!existingTool) {
    return next(Boom.notFound('Tool not found'));
  }
  if (!existingTool.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  if (existingTool.picture.includes(config.get('fileStorage.s3Bucket'))) {
    await deleteObject(getFileNameFromUrl(existingTool.picture));
  }

  await deleteTool(id);
  return res.send({ success: true });
};

module.exports = { deleteToolRoute };
