const { Joi } = require('celebrate');

const { SAVE_FOR_LATER } = require('../../../constants');
const { findOne } = require('../../../db/save-for-later');

const getByEntityValidation = {
  params: Joi.object({
    entity: Joi.string().valid(...Object.values(SAVE_FOR_LATER)),
  }).required(),
};

const getByEntityRoute = async (req, res) => {
  const {
    context: { userId },
    params: { entity },
  } = req;

  const saveForLaterObj = await findOne({ userId });
  return res.send(saveForLaterObj?.[entity] || []);
};

module.exports = { getByEntityRoute, getByEntityValidation };
