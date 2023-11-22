const swaggerUi = require('swagger-ui-express');
const config = require('config');
const components = require('./components');
const paths = require('./paths');

const options = {
  openapi: '3.0.1',
  info: {
    version: '0.0.0',
    title: 'Observe',
    description: 'Observe Data API',
  },
  servers: [
    {
      url: `http://${config.get('http.host')}:${config.get('http.port')}`,
      description: 'Server',
    },
  ],
  swaggerOptions: {
    basicAuth: {
      name: 'Authorization',
      schema: {
        type: 'basic',
        in: 'header',
      },
      value: 'Basic <user:password>',
    },
  },
  security: [
    {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        value: 'Bearer <id>',
      },
    },
  ],
  components,
  paths,
};

const swagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(options));
};

module.exports = { swagger };
