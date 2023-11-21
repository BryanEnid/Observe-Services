const Boom = require('boom');
const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
	const error = err.isBoom ? err : Boom.boomify(err);

	if (!res.headersSent) {
		res.status(error.output.statusCode).send(error.output.payload);
	}

	if (error.isServer) {
		logger().error(error);
	}

	// Error is handled, proceed to next middleware
	next();
};

module.exports =  errorHandler;
