const booksPaths = {
  '/api/books': {
    get: {
      tags: ['Recommends Books'],
      summary: 'Get books list',
      parameters: [
        {
          in: 'query',
          name: 'ownerId',
          description: 'Return ony books by user id',
          allowEmptyValue: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Books were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: '#/components/schemas/Book',
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
      tags: ['Recommends Books'],
      summary: 'Create book',
      requestBody: {
        description: 'The book to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/BookCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Book was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Book',
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
  '/api/books/{id}': {
    put: {
      tags: ['Recommends Books'],
      summary: 'Update book',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Book id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The book to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Book',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Book by id was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Book',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Book not found',
        },
      },
    },
    delete: {
      tags: ['Recommends Books'],
      summary: 'Delete book',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Book id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Book was deleted',
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
          description: 'Book not found',
        },
      },
    },
  },
  '/api/books/{id}/photos': {
    post: {
      tags: ['Recommends Books'],
      summary: 'Create book photo',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Book id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The book photo to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/BookPhotoCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Book photo was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Book',
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
  '/api/books/{id}/photos/upload': {
    post: {
      tags: ['Recommends Books'],
      summary: 'Upload and create photo for book',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Book id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'Book photo image',
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                photo: {
                  type: 'string',
                  format: 'binary',
                  allowEmptyValue: false,
                  required: true,
                },
                description: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'File was uploaded and book doc was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Book',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Book not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },
  '/api/books/{id}/photos/{photoId}': {
    put: {
      tags: ['Recommends Books'],
      summary: 'Update book photo',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Book id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'photoId',
          description: 'Book photo id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The book photo to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/BookPhoto',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Book photo by id was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Book',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Book or photo not found',
        },
      },
    },
    delete: {
      tags: ['Recommends Books'],
      summary: 'Delete book photo',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Book id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'photoId',
          description: 'Book photo id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Book photo was deleted',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Book',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Book or photo not found',
        },
      },
    },
  },
  '/api/books/{id}/photos/{photoId}/upload': {
    put: {
      tags: ['Recommends Books'],
      summary: 'Upload and update photo for book',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Book id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'photoId',
          description: 'Book photo id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'Book photo image',
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                photo: {
                  type: 'string',
                  format: 'binary',
                  allowEmptyValue: false,
                  required: true,
                },
                description: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'File was uploaded and book doc was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Book',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Book or photo not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },
};

module.exports = booksPaths;
