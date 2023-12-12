const { SAVE_FOR_LATER } = require('../../../constants');
const { findOne } = require('../../../db/save-for-later');

const initialVal = Object
  .values(SAVE_FOR_LATER)
  .reduce((acc, entityName) => ({ ...acc, [entityName]: [] }), {});

const getRoute = async (req, res) => {
  const {
    context: { userId },
  } = req;

  const saveForLaterObj = await findOne({ userId });
  return res.send(saveForLaterObj || initialVal);
};

module.exports = { getRoute };
