const Boom = require('boom');
const config = require('config');

const { findPeople, deletePeople } = require('../../../db/people');
const { getFileNameFromUrl, deleteObject } = require('../../../utils/s3');

const deletePeopleRoute = async (req, res, next) => {
  const { context: { userId }, params: { id } } = req;

  const existingPeople = await findPeople({ _id: id });
  if (!existingPeople) {
    return next(Boom.notFound('People not found'));
  }
  if (!existingPeople.creatorId.equals(userId)) {
    return next(Boom.forbidden());
  }

  if (existingPeople.picture.includes(config.get('fileStorage.s3Bucket'))) {
    await deleteObject(getFileNameFromUrl(existingPeople.picture));
  }

  await deletePeople(id);
  return res.send({ success: true });
};

module.exports = { deletePeopleRoute };
