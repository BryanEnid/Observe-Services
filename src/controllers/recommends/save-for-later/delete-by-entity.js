const { Joi } = require('celebrate');

const { SAVE_FOR_LATER } = require('../../../constants');
const { updateSaveForLater } = require('../../../db/save-for-later');

const deleteEntityValidation = {
  params: Joi.object({
    entity: Joi.string().valid(...Object.values(SAVE_FOR_LATER)).required(),
    entityId: Joi.string().required(),
  }).required(),
};

const deleteEntityRoute = async (req, res) => {
  const {
    context: { userId },
    params: { entity, entityId },
  } = req;

  await updateSaveForLater(
    { userId },
    {
      $pull: {
        [entity]: entityId,
      },
    },
  );
  return res.send({ success: true });
};
module.exports = { deleteEntityRoute, deleteEntityValidation };
