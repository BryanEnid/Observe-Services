const peoplePaths = {
  '/api/people': {
    get: {
      tags: ['Recommends People'],
      summary: 'Get people list',
      parameters: [
        {
          in: 'query',
          name: 'ownerId',
          summary: 'Return ony people for user id',
          allowEmptyValue: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'People were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: '#/components/schemas/People',
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
      tags: ['Recommends People'],
      summary: 'Create people',
      requestBody: {
        description: 'The people to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/PeopleCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'People doc was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/People',
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
  '/api/people/{id}': {
    put: {
      tags: ['Recommends People'],
      summary: 'Update people',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'People id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The people to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/People',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'People by id was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/People',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'People not found',
        },
      },
    },
    delete: {
      tags: ['Recommends People'],
      summary: 'Delete people',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'People id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'People was deleted',
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
          description: 'People not found',
        },
      },
    },
  },
  '/api/people/{id}/upload': {
    put: {
      tags: ['Recommends People'],
      summary: 'Upload and update image for people doc',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'People id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'People image',
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                picture: {
                  type: 'string',
                  format: 'binary',
                  allowEmptyValue: false,
                  required: true,
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'File was uploaded and people doc was updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemas/People',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
          },
          404: {
            description: 'People not found',
          },
          422: {
            description: 'Unprocessable Entity',
          },
        },
      },
    },
  },
};

module.exports = peoplePaths;
