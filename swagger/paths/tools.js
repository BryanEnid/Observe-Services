const toolsPaths = {
  '/api/tools': {
    get: {
      tags: ['Recommends Tools'],
      summary: 'Get tools list',
      parameters: [
        {
          in: 'query',
          name: 'ownerId',
          summary: 'Return ony tools for user id',
          allowEmptyValue: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Tools were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: '#/components/schemas/Tool',
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
      tags: ['Recommends Tools'],
      summary: 'Create tool',
      requestBody: {
        description: 'The tool to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/ToolCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Tool was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Tool',
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
  '/api/tools/{id}': {
    put: {
      tags: ['Recommends Tools'],
      summary: 'Update tool',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Tool id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The tool to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Tool',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Tool by id was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Tool',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Tool not found',
        },
      },
    },
    delete: {
      tags: ['Recommends Tools'],
      summary: 'Delete tool',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Tool id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Tool was deleted',
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
          description: 'Tool not found',
        },
      },
    },
  },
  '/api/tools/{id}/upload': {
    put: {
      tags: ['Recommends Tools'],
      summary: 'Upload and update image for tool',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Tool id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'Tool image',
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
      },
      responses: {
        200: {
          description: 'File was uploaded and tool doc was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Tool',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Tool not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },
};

module.exports = toolsPaths;
