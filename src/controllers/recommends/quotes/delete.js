const Boom = require('boom');

const { findQuot, deleteQuot } = require('../../../db/quotes');

const deleteQuotRoute = async (req, res, next) => {
  const { context: { userId }, params: { id } } = req;

  const existingQuot = await findQuot({ _id: id });
  if (!existingQuot) {
    return next(Boom.notFound('Quot not found'));
  }
  if (!existingQuot.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  await deleteQuot(id);
  return res.send({ success: true });
};

module.exports = { deleteQuotRoute };
