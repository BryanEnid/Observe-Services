const Boom = require('boom');
const { jwtDecode } = require('jwt-decode');

const { getUserById } = require('../db/users');
const { logger } = require('../utils/logger');

const authMiddleware = () => async (req, res, next) => {
  const authorization = req.headers.authorization || '';

  if (!authorization) return next(Boom.unauthorized());

  const { user_id: id } = jwtDecode(authorization);

  getUserById(id)
    .then((user) => {
      req.context = { userId: user.id };
      if (!user) return next(Boom.unauthorized());
      return next();
    })
    .catch((e) => logger().error(e));

  return next();
};

module.exports = { authMiddleware };
