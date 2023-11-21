const pino = require('pino');
const pinoHTTP = require('pino-http');
const config = require('config');

const root = pino({
	level: config.get('logger.level'),
});

function logger() {
	return root.child({});
}

function loggingMiddleware() {
	const pinoHTTPOpts = {
		logger: logger(),
	};

	const middlewareLogger = pinoHTTP(pinoHTTPOpts);

	return (req, res, next) => {
		middlewareLogger(req, res);
		next();
	};
}

module.exports = { logger, loggingMiddleware };
