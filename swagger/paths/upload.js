const uploadPaths = {
  '/api/upload/progress': {
    post: {
      tags: ['Upload'],
      summary: 'Upload bucket files to S3',
      parameters: [],
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
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Files were uploaded',
          content: {
            'application/json': {
              schema: {
                properties: {
                  image: { type: 'string' },
                  videoUrl: { type: 'string' },
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
};

module.exports = uploadPaths;
