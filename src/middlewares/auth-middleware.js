const Boom = require('boom');
// const { jwtDecode } = require('jwt-decode');

const { getUserById } = require('../db/users');
const { logger } = require('../utils/logger');

const authMiddleware = () => async (req, res, next) => {
  const authorization = req.headers.authorization || '';
  if (!authorization) {
    return next(Boom.unauthorized());
  }

  let user;
  try {
    const id = authorization.replace('Bearer ', '').trim();
    user = await getUserById(id);
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
