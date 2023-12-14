const Boom = require('boom');

const firebaseAdmin = require('../firebase');
const { findUser } = require('../db/users');
const { logger } = require('../utils/logger');

const authMiddleware = () => async (req, res, next) => {
  const authorization = req.headers.authorization || '';
  if (!authorization) {
    return next(Boom.unauthorized());
  }

  let user;
  try {
    const token = authorization.replace('Bearer ', '').trim();
    const { uid } = await firebaseAdmin.auth().verifyIdToken(token);

    user = await findUser({ uid });
  } catch (e) {
    logger().error(e);
  }

  if (!user) {
    return next(Boom.unauthorized());
  }

  req.context = {
    userId: user.id,
  };

  return next();
};

module.exports = { authMiddleware };
