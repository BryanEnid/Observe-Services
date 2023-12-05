const bucketsPaths = {
  '/api/buckets': {
    get: {
      tags: ['Bucket'],
      summary: 'Get Buckets',
      parameters: [
        {
          in: 'query',
          name: 'ownerId',
          summary: 'Return ony buckets for user id',
          allowEmptyValue: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Buckets were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: '#/components/schemas/Bucket',
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
      tags: ['Bucket'],
      summary: 'Create Bucket',
      parameters: [],
      requestBody: {
        description: 'The bucket to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/BucketCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Bucket was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Bucket',
              },
            },
          },
        },
        400: {
          description: 'Bad request: invalid bucket',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },
  '/api/buckets/{id}': {
    get: {
      tags: ['Bucket'],
      summary: 'Get Bucket by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Return bucket by id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Bucket by id was obtained',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Bucket',
              },
            },
          },
        },
        400: {
          description: 'Bad request: invalid bucket',
        },
        404: {
          description: 'Bucket not found',
        },
      },
    },
    put: {
      tags: ['Bucket'],
      summary: 'Update Bucket',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Update bucket by id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The bucket to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Bucket',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Bucket by id was update',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Bucket',
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
      tags: ['Bucket'],
      summary: 'Delete Bucket',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Delete bucket by id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Bucket by id was deleted',
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
  '/api/buckets/{id}/video': {
    post: {
      tags: ['Bucket'],
      summary: 'Upload and add video for Bucket',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'Video and Image files',
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                image: {
                  type: 'string', format: 'binary', allowEmptyValue: false, required: true,
                },
                video: {
                  type: 'string', format: 'binary', allowEmptyValue: false, required: true,
                },
                chosen: {
                  type: 'boolean',
                  allowEmptyValue: true,
                  required: false,
                  default: 'false',
                },
                selected: {
                  type: 'boolean',
                  allowEmptyValue: true,
                  required: false,
                  default: 'false',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Files were uploaded and added to a bucket',
          content: {
            'application/json': {
              schema: {
                properties: {
                  id: { type: 'string' },
                  image: { type: 'string' },
                  videoUrl: { type: 'string' },
                  chosen: { type: 'boolean' },
                  selected: { type: 'boolean' },
                },
              },
            },
          },
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },
  '/api/buckets/{id}/process': {
    post: {
      tags: ['Bucket'],
      summary: 'Upload and initiate video process and add to Bucket',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'Videos and Image files, and process options',
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                image: {
                  type: 'string', format: 'binary', allowEmptyValue: false, required: true,
                },
                mainVideo: {
                  type: 'string', format: 'binary', allowEmptyValue: false, required: true,
                },
                subVideo: {
                  type: 'string', format: 'binary', allowEmptyValue: false, required: true,
                },
                chosen: {
                  type: 'boolean',
                  allowEmptyValue: true,
                  required: false,
                  default: 'false',
                },
                selected: {
                  type: 'boolean',
                  allowEmptyValue: true,
                  required: false,
                  default: 'false',
                },
                rounded: {
                  type: 'boolean',
                  allowEmptyValue: true,
                  required: false,
                  default: 'false',
                },
                mainSound: {
                  type: 'boolean',
                  allowEmptyValue: true,
                  required: false,
                  default: 'true',
                },
                subSound: {
                  type: 'boolean',
                  allowEmptyValue: true,
                  required: false,
                  default: 'true',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Files were uploaded and added to a bucket, video process has been initiated',
          content: {
            'application/json': {
              schema: {
                properties: {
                  id: { type: 'string' },
                  image: { type: 'string' },
                  chosen: { type: 'boolean' },
                  selected: { type: 'boolean' },
                  process: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      status: {
                        type: 'string',
                        enum: ['PROCESSING', 'UPLOADING', 'ERROR', 'DONE'],
                      },
                      percent: { type: 'number' },
                    },
                  },
                },
              },
            },
          },
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },

  '/api/buckets/{id}/videos/{videoId}/questions': {
    get: {
      tags: ['Bucket Question'],
      summary: 'Get questions list for the bucket video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Questions were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: '#/components/schemas/VideoQuestion',
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Bucket or video not found',
        },
      },
    },
    post: {
      tags: ['Bucket Question'],
      summary: 'Create a question for the bucket video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The question to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/VideoQuestionCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Question was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Bucket',
              },
            },
          },
        },
        400: {
          description: 'Bad request: invalid bucket',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },
  '/api/buckets/{id}/videos/{videoId}/questions/{questionId}': {
    put: {
      tags: ['Bucket Question'],
      summary: 'Update the question for the bucket video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'questionId',
          summary: 'Question id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The question to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/VideoQuestion',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Question was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Bucket',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Bucket or video not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
    delete: {
      tags: ['Bucket Question'],
      summary: 'Delete question for the bucket video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'questionId',
          summary: 'Question id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Question was deleted',
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
          description: 'Bucket, video or question not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },
  '/api/buckets/{id}/videos/{videoId}/questions/{questionId}/answer': {
    post: {
      tags: ['Bucket Question'],
      summary: 'Add answer for the question to the bucket video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'questionId',
          summary: 'Question id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'Add answer to the question',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/QuestionAnswer',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Answer was added',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Bucket',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Bucket, video or question not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
    put: {
      tags: ['Bucket Question'],
      summary: 'Update answer the question for the bucket video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'questionId',
          summary: 'Question id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The answer to the question',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/QuestionAnswer',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Answer was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Bucket',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Bucket, video or question not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
    delete: {
      tags: ['Bucket Question'],
      summary: 'Delete answer for the question',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'questionId',
          summary: 'Question id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'The answer for the question was deleted',
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
          description: 'Bucket, video or question not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },

  '/api/buckets/{id}/videos/{videoId}/polls': {
    get: {
      tags: ['Bucket Polls'],
      summary: 'Get polls list for the bucket video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Polls were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: '#/components/schemas/VideoPoll',
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Bucket or video not found',
        },
      },
    },
    post: {
      tags: ['Bucket Polls'],
      summary: 'Create a poll for the bucket video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The poll to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/VideoPollCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Poll was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Bucket',
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
  '/api/buckets/{id}/videos/{videoId}/polls/{pollId}': {
    put: {
      tags: ['Bucket Polls'],
      summary: 'Update the poll for the bucket video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'pollId',
          summary: 'Poll id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The poll to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/VideoPoll',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Poll was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Bucket',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Bucket, video or poll not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
    delete: {
      tags: ['Bucket Polls'],
      summary: 'Delete poll for the bucket video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'pollId',
          summary: 'Poll id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Poll was deleted',
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
          description: 'Bucket, video or poll not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },
  '/api/buckets/{id}/videos/{videoId}/polls/{pollId}/answer': {
    post: {
      tags: ['Bucket Polls'],
      summary: 'Add answer for the poll to the bucket video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'pollId',
          summary: 'Poll id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'Add answer to the poll',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/QuestionAnswer',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Answer was added',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Bucket',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Bucket, video or poll not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
    put: {
      tags: ['Bucket Polls'],
      summary: 'Update answer the poll for the bucket video',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'pollId',
          summary: 'Poll id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The answer to the poll',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/QuestionAnswer',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Answer was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Bucket',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Bucket, video or poll not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
    delete: {
      tags: ['Bucket Polls'],
      summary: 'Delete answer for the poll',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Bucket id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'videoId',
          summary: 'Video id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'pollId',
          summary: 'Poll id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'The answer for the poll was deleted',
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
          description: 'Bucket, video or poll not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },
};

module.exports = bucketsPaths;
