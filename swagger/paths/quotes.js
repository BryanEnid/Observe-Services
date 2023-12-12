const quotesPaths = {
  '/api/quotes': {
    get: {
      tags: ['Recommends Quotes'],
      summary: 'Get quotes list',
      parameters: [
        {
          in: 'query',
          name: 'ownerId',
          summary: 'Return ony quotes by user id',
          allowEmptyValue: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Quotes were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: '#/components/schemas/Quot',
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
      },
    },
    post: {
      tags: ['Recommends Quotes'],
      summary: 'Create quot',
      requestBody: {
        description: 'The quot to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/QuotCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Quot was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Quot',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },
  '/api/quotes/{id}': {
    put: {
      tags: ['Recommends Quotes'],
      summary: 'Update quot',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Quot id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The quot to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Quot',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Quot by id was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Quot',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Quot not found',
        },
      },
    },
    delete: {
      tags: ['Recommends Quotes'],
      summary: 'Delete quot',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Quot id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Quot was deleted',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Quot not found',
        },
      },
    },
  },
};

module.exports = quotesPaths;
