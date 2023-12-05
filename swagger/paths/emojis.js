const emojisPaths = {
  '/api/emojis': {
    get: {
      tags: ['Emoji'],
      summary: 'Get Emojis',
      parameters: [
        {
          in: 'query',
          name: 'search',
          summary: 'Return emojis for search string',
          required: true,
          allowEmptyValue: false,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Emojis were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    iconCode: { type: 'string' },
                    iconUrl: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
};

module.exports = emojisPaths;
