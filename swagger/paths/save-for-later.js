const { SAVE_FOR_LATER } = require('../../src/constants');

const saveForLaterPaths = {
  '/api/save-for-later': {
    get: {
      tags: ['Recommends Save For Later'],
      summary: 'Get Save For Later doc',
      responses: {
        200: {
          description: 'Save For Later doc were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/SaveForLater',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
      },
    },
  },
  '/api/save-for-later/{entity}': {
    get: {
      tags: ['Recommends Save For Later'],
      summary: 'Get Save For Later entities list',
      parameters: [
        {
          in: 'path',
          name: 'entity',
          summary: 'Save For Later entity',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
            enum: Object.values(SAVE_FOR_LATER),
          },
        },
      ],
    },
  },
  '/api/save-for-later/{entity}/{entityId}': {
    post: {
      tags: ['Recommends Save For Later'],
      summary: 'Add entity to Save For Later',
      parameters: [
        {
          in: 'path',
          name: 'entity',
          summary: 'Save For Later entity',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
            enum: Object.values(SAVE_FOR_LATER),
          },
        },
        {
          in: 'path',
          name: 'entityId',
          summary: 'Save For Later entity id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Save For Later entity was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/SaveForLater',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'SaveForLater not found',
        },
      },
    },
    delete: {
      tags: ['Recommends Save For Later'],
      summary: 'Get entity from Save For Later',
      parameters: [
        {
          in: 'path',
          name: 'entity',
          summary: 'Save For Later entity',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
            enum: Object.values(SAVE_FOR_LATER),
          },
        },
        {
          in: 'path',
          name: 'entityId',
          summary: 'Save For Later entity id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Save For Later entity was deleted',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/SaveForLater',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'SaveForLater not found',
        },
      },
    },
  },
};

module.exports = saveForLaterPaths;
