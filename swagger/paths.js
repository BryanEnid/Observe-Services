const paths = {
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
				'200': {
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
				'400': {
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
				'200': {
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
				'400': {
					description: 'Bad request: invalid bucket',
				},
				'422': {
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
				'200': {
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
				'400': {
					description: 'Bad request: invalid bucket',
				},
				'404': {
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
				'200': {
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
				'400': {
					description: 'Bad request',
				},
				'404': {
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
				'200': {
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
				'400': {
					description: 'Bad request',
				},
				'404': {
					description: 'Bucket not found',
				},
			},
		},
	},

	'/api/users': {
		get: {
			tags: ['User'],
			summary: 'Get users',
			parameters: [],
			responses: {
				'200': {
					description: 'Users were obtained',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									type: 'object',
									$ref: '#/components/schemas/User',
								},
							},
						},
					},
				},
				'400': {
					description: 'Bad request',
				},
			},
		},
		post: {
			tags: ['User'],
			summary: 'Create users',
			security: {},
			parameters: [],
			requestBody: {
				description: 'The user to create',
				required: true,
				content: {
					'application/json': {
						schema: {
							type: 'object',
							$ref: '#/components/schemas/UserCreateInput',
						},
					},
				},
			},
			responses: {
				'200': {
					description: 'User was created',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/User',
							},
						},
					},
				},
				'400': {
					description: 'Bad request: invalid user',
				},
				'422': {
					description: 'Unprocessable Entity',
				},
			},
		},
	},
	'/api/users/{id}': {
		get: {
			tags: ['User'],
			summary: 'Get user by id',
			parameters: [
				{
					in: 'path',
					name: 'id',
					summary: 'Return user by id',
					allowEmptyValue: false,
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				'200': {
					description: 'User by id was obtained',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/User',
							},
						},
					},
				},
				'400': {
					description: 'Bad request',
				},
				'404': {
					description: 'Bucket not found',
				},
			},
		},
		put: {
			tags: ['User'],
			summary: 'Update user',
			parameters: [
				{
					in: 'path',
					name: 'id',
					summary: 'Update user by id',
					allowEmptyValue: false,
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			requestBody: {
				description: 'The user to update',
				required: true,
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/User',
						},
					},
				},
			},
			responses: {
				'200': {
					description: 'User by id was updated',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/User',
							},
						},
					},
				},
				'400': {
					description: 'Bad request',
				},
				'404': {
					description: 'Bucket not found',
				},
			},
		},
		delete: {
			tags: ['User'],
			summary: 'Delete users',
			parameters: [
				{
					in: 'path',
					name: 'id',
					summary: 'Delete user by id',
					allowEmptyValue: false,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				'200': {
					description: 'User by id was deleted',
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
				'400': {
					description: 'Bad request',
				},
				'404': {
					description: 'Bucket not found',
				},
			},
		},
	},

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
								image: { type: 'string', format: 'binary', allowEmptyValue: false, required: true },
								video: { type: 'string', format: 'binary', allowEmptyValue: false, required: true },
							},
						},
					},
				},
			},
			responses: {
				'200': {
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
				'422': {
					description: 'Unprocessable Entity',
				},
			},
		},
	},
};

module.exports = paths;
