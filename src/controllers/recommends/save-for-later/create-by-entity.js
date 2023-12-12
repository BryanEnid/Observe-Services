const { Joi } = require('celebrate');
const Boom = require('boom');

const { SAVE_FOR_LATER } = require('../../../constants');
const { findOne, createSaveForLater, updateSaveForLater } = require('../../../db/save-for-later');
const { findBook } = require('../../../db/books');

const createEntityValidation = {
  params: Joi.object({
    entity: Joi.string().valid(...Object.values(SAVE_FOR_LATER)).required(),
    entityId: Joi.string().required(),
  }).required(),
};

const entityFinderMap = {
  [SAVE_FOR_LATER.BOOKS]: findBook,
};

const findEntity = (entityName, entityId) => {
  if (typeof entityFinderMap[entityName] !== 'function') {
    throw Boom.badImplementation();
  }

  return entityFinderMap[entityName]({ _id: entityId });
};

const createEntityRoute = async (req, res, next) => {
  const {
    context: { userId },
    params: { entity, entityId },
  } = req;

  const resourceEntity = await findEntity(entity, entityId);
  if (!resourceEntity) {
    return next(Boom.notFound(`Resource entity (${entity}) with id: ${entityId} not found`));
  }

  const existingObj = await findOne({ userId });
  if (!existingObj) {
    const createdObj = await createSaveForLater({ userId, [entity]: [entityId] });
    return res.send(createdObj);
  }

  const existingEntityId = existingObj[entity].find(id => id.equals(entityId));
  if (existingEntityId) {
    return res.send(existingObj);
  }

  const updated = await updateSaveForLater(
    { userId },
    {
      $push: { [entity]: entityId },
    },
  );
  return res.send(updated);
};

module.exports = { createEntityRoute, createEntityValidation };
