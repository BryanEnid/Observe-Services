const components = {
	securitySchemes: {
		BearerAuth: {
			type: 'http',
			scheme: 'bearer',
			in: 'header',
		}
	},
	schemas: {
		Bucket: {
			type: 'object',
			properties: {
				id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
				name: { type: 'string', example: 'My Bucket' },
				title: { type: 'string', example: 'My Bucket Title' },
				description: { type: 'string', example: 'My Bucket Description' },
				videos: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							image: { type: 'string' },
							videoUrl: { type: 'string' },
							chosen: { type: 'boolean' },
							selected: { type: 'boolean' },
						},
					}
				},
				createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
				updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
			}
		},
		User: {
			type: 'object',
			properties: {}
		},
	},
};

module.exports = components;
