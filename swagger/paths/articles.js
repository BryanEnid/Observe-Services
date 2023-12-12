const articlesPaths = {
  '/api/articles': {
    get: {
      tags: ['Recommends Articles'],
      summary: 'Get articles list',
      parameters: [
        {
          in: 'query',
          name: 'ownerId',
          summary: 'Return ony articles by creator id',
          allowEmptyValue: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Articles were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: '#/components/schemas/Article',
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
      tags: ['Recommends Articles'],
      summary: 'Create Article',
      requestBody: {
        description: 'The article to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/ArticleCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Article was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Article',
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
  '/api/articles/{id}': {
    put: {
      tags: ['Recommends Articles'],
      summary: 'Update article',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Article id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The article to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ArticleCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Article by id was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Article',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Article not found',
        },
      },
    },
    delete: {
      tags: ['Recommends Articles'],
      summary: 'Delete article',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Article id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Article was deleted',
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
          description: 'Article not found',
        },
      },
    },
  },
};

module.exports = articlesPaths;
