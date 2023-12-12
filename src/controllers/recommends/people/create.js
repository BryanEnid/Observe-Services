const { Joi } = require('celebrate');
const { createPeople } = require('../../../db/people');

const createPeopleValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    picture: Joi.string().optional().allow(null, ''),
  }).required(),
};

const createPeopleRoute = async (req, res) => {
  const { context: { userId }, body } = req;

  const people = await createPeople({ ...body, creatorId: userId });
  return res.send(people);
};

module.exports = { createPeopleRoute, createPeopleValidation };
