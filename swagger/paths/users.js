const usersPaths = {
  '/api/users': {
    get: {
      tags: ['User'],
      summary: 'Get users',
      parameters: [],
      responses: {
        200: {
          description: 'Users were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: '#/components/schemas/User',
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
      tags: ['User'],
      summary: 'Create users',
      security: {},
      parameters: [],
      requestBody: {
        description: 'The user to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/UserCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        400: {
          description: 'Bad request: invalid user',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },
  '/api/users/{id}': {
    get: {
      tags: ['User'],
      summary: 'Get user by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Return user by id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'User by id was obtained',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Bucket not found',
        },
      },
    },
    put: {
      tags: ['User'],
      summary: 'Update user',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Update user by id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The user to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User by id was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Bucket not found',
        },
      },
    },
    delete: {
      tags: ['User'],
      summary: 'Delete users',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Delete user by id',
          allowEmptyValue: false,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'User by id was deleted',
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
          description: 'Bucket not found',
        },
      },
    },
  },
};

module.exports = usersPaths;
