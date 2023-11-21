const paths = {
	'/api/buckets': {
		get: {
			tags: ['Bucket'],
			description: 'Get Buckets',
			parameters: [
				{
					in: 'query',
					name: 'ownerId',
					description: 'Return ony buckets for user id',
					allowEmptyValue: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {},
		},
		post: {
			tags: ['Bucket'],
			description: 'Create Bucket',
			parameters: [],
			responses: {},
		},
	},
	'/api/buckets/{id}': {
		get: {
			tags: ['Bucket'],
			description: 'Get Bucket by id',
			parameters: [],
			responses: {},
		},
		put: {
			tags: ['Bucket'],
			description: 'Update Bucket',
			parameters: [],
			responses: {},
		},
		delete: {
			tags: ['Bucket'],
			description: 'Delete Bucket',
			parameters: [],
			responses: {},
		},
	},

	'/api/users': {
		get: {
			tags: ['User'],
			description: 'Get users',
			parameters: [],
			responses: {
				'200': {
					description: 'Users were obtained',
				},
				'400': {
					description: 'Bad request',
				},
			},
		},
		post: {
			tags: ['User'],
			description: 'Create users',
			security: {},
			parameters: [],
			responses: {},
		},
	},
	'/api/users/{id}': {
		get: {
			tags: ['User'],
			description: 'Get user by id',
			parameters: [],
			responses: {},
		},
		put: {
			tags: ['User'],
			description: 'Update users',
			parameters: [],
			responses: {},
		},
		delete: {
			tags: ['User'],
			description: 'Delete users',
			parameters: [],
			responses: {},
		},
	},
	'/api/upload/progress': {
		post: {
			tags: ['Upload'],
			description: 'Upload bucket files to S3',
			parameters: [],
			responses: {},
		},
	},
};

module.exports = paths;
