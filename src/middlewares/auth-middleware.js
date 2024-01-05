const Boom = require('boom');

const firebaseAdmin = require('../firebase');
const { findUser } = require('../db/users');
const { logger } = require('../utils/logger');
const { getUserInfo } = require('../services/linkedin');

const authMiddleware = () => async (req, res, next) => {
  const authorization = req.headers.authorization || '';
  if (!authorization) {
    return next(Boom.unauthorized());
  }

  let user;
  try {
    const token = authorization.replace('Bearer ', '').trim();
    const isJWT = token.split('.').length === 3;
    if (isJWT) {
      const { uid } = await firebaseAdmin.auth().verifyIdToken(token);
      user = await findUser({ uid });
    } else {
      const { sub } = await getUserInfo(token);
      user = await findUser({ uid: sub });
    }
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
