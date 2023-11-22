const Boom = require('boom');

function errorWrapper(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      if (Boom.isBoom(err)) {
        next(err);
        return;
      }

      next(Boom.internal(err));
    }
  };
}

module.exports = errorWrapper;
