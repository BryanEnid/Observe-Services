const { Joi } = require('celebrate');
const Boom = require('boom');
const config = require('config');

const { getFileNameFromUrl, deleteObject } = require('../../../utils/s3');
const { findTool, updateTool } = require('../../../db/tools');

const updateToolValidation = {
  body: Joi.object({
    title: Joi.string().optional(),
    category: Joi.string().optional(),
    description: Joi.string().optional(),
    picture: Joi.string().optional().allow(null, ''),
  }).required(),
};

/**
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @return {Promise<void>}
 */
const updateToolRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { id },
    body,
  } = req;

  const existingTool = await findTool({ _id: id });
  if (!existingTool) {
    return next(Boom.notFound('Tool not found'));
  }
  if (!existingTool.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  const isInternalFile = existingTool.picture.includes(config.get('fileStorage.s3Bucket'));
  if (existingTool.picture && existingTool.picture !== body.picture && isInternalFile) {
    await deleteObject(getFileNameFromUrl(existingTool.picture));
  }

  const updatedTool = await updateTool({ _id: id, creatorId: userId }, body);
  return res.send(updatedTool);
};

module.exports = { updateToolRoute, updateToolValidation };
