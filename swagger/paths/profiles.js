const profilesPaths = {
  '/api/profile': {
    post: {
      tags: ['Profile'],
      summary: 'Create Profile',
      parameters: [],
      requestBody: {
        description: 'The profile to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/ProfileCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Profile was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
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
  '/api/profile/{id}': {
    get: {
      tags: ['Profile'],
      summary: 'Get Profile by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Return profile by id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Profile by id was obtained',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Profile not found',
        },
      },
    },
    put: {
      tags: ['Profile'],
      summary: 'Update Profile by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Profile id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The profile to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Profile',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Profile by id was update',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Profile not found',
        },
      },
    },
  },
  '/api/profile/{id}/about': {
    put: {
      tags: ['Profile'],
      summary: 'Update about profile text',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Profile id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The profile description to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Profile description by id was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Profile not found',
        },
      },
    },
  },
  '/api/profile/{id}/skills': {
    post: {
      tags: ['Profile'],
      summary: 'Create profile skill',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Profile id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The profile skill to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SkillCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Profile skill was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Profile or skill not found',
        },
      },
    },
  },
  '/api/profile/{id}/skills/{skillId}': {
    put: {
      tags: ['Profile'],
      summary: 'Update profile skill by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Profile id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'skillId',
          summary: 'Skill id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The profile skill to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Skill',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Profile skill was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Profile or skill not found',
        },
      },
    },
    delete: {
      tags: ['Profile'],
      summary: 'Delete profile skill by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Profile id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'skillId',
          summary: 'Skill id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Profile skill was delete',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Profile or skill not found',
        },
      },
    },
  },
  '/api/profile/{id}/career-history': {
    post: {
      tags: ['Profile'],
      summary: 'Create profile career history',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Profile id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The profile career history to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CareerHistoryCreateInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Profile career history was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Profile not found',
        },
      },
    },
  },
  '/api/profile/{id}/career-history/{historyId}': {
    put: {
      tags: ['Profile'],
      summary: 'Update profile career history by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Profile id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'historyId',
          summary: 'Career history id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'The profile career history to update',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CareerHistory',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Profile career history was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Profile or career history not found',
        },
      },
    },
    delete: {
      tags: ['Profile'],
      summary: 'Delete profile career history by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Profile id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'historyId',
          summary: 'Career history id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Profile career history was delete',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Profile or career history not found',
        },
      },
    },
  },
  '/api/profile/{id}/career-history/{historyId}/upload': {
    put: {
      tags: ['Profile'],
      summary: 'Upload and add a custom logo to career history company',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Profile id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'historyId',
          summary: 'Career history id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'Logo image',
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                companyLogo: {
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
          description: 'File was uploaded and profile career history was updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Profile or career history not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },

  '/api/profile/{id}/attachments': {
    post: {
      tags: ['Profile'],
      summary: 'Upload and add an attachment profile',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Profile id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'Logo image',
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
                  allowEmptyValue: false,
                  required: true,
                },
                preview: {
                  type: 'string',
                  format: 'binary',
                  allowEmptyValue: true,
                  required: false,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Files was uploaded and added to profile',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Profile not found',
        },
        422: {
          description: 'Unprocessable Entity',
        },
      },
    },
  },
  '/api/profile/{id}/attachments/{attachmentId}': {
    delete: {
      tags: ['Profile'],
      summary: 'Delete attachment from profile',
      parameters: [
        {
          in: 'path',
          name: 'id',
          summary: 'Profile id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'attachmentId',
          summary: 'Attachment id',
          allowEmptyValue: false,
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Attachment files was removed form profile',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Profile',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        404: {
          description: 'Profile or attachment not found',
        },
      },
    },
  },
};

module.exports = profilesPaths;
