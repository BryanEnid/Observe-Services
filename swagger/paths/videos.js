const videosPaths = {
  '/api/videos': {
    get: {
      tags: ['Recommends Videos'],
      summary: 'Get videos list',
      parameters: [
        {
          in: 'query',
          name: 'ownerId',
          summary: 'Return ony videos by creator id',
          allowEmptyValue: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Videos were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: '#/components/schemas/Video',
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
      tags: ['Recommends Videos'],
      summary: 'Create Video',
      requestBody: {
        description: 'The video to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/VideoCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Video was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Video',
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
  '/api/videos/{id}': {
    put: {
      tags: ['Recommends Videos'],
      summary: 'Update video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The video to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/VideoCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Video by id was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Video',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Video not found',
        },
      },
    },
    delete: {
      tags: ['Recommends Videos'],
      summary: 'Delete video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Video was deleted',
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
          description: 'Video not found',
        },
      },
    },
  },
};

module.exports = videosPaths;
