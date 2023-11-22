const bucketCreateInput = {
	name: { type: 'string', example: 'My Bucket' },
	title: { type: 'string', example: 'My Bucket Title' },
	description: { type: 'string', example: 'My Bucket Description' },
	videos: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				image: { type: 'string', example: 'http://url' },
				videoUrl: { type: 'string', example: 'http://url' },
				chosen: { type: 'boolean', example: false },
				selected: { type: 'boolean', example: false },
			},
		},
	},
};

const userCreateInput = {
	email: { type: 'string', example: 'user.email@email.email' },
	name: { type: 'string', example: 'User Name' },
	photoURL: { type: 'string', example: 'http://user-photo.url' },
	username: { type: 'string', example: 'UserName' },
	providerData: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				displayName: { type: 'string', example: 'User Name' },
				email: { type: 'string', example: 'user.email@email.email' },
				phoneNumber: { type: 'string', example: '+111111111111' },
				photoURL: { type: 'string', example: 'http://user-photo.url' },
				providerId: { type: 'string', example: 'http://user-photo.url' },
				uid: { type: 'string', example: 'http://user-photo.url' },
			},
		},
	},
	reloadUserInfo: {
		type: 'object',
		properties: {
			createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
			displayName: { type: 'string', example: 'User Name' },
			email: { type: 'string', example: 'user.email@email.email' },
			emailVerified: { type: 'boolean', example: true },
			lastLoginAt: { type: 'string', example: '1700151976736' },
			lastRefreshAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
			localId: { type: 'string', example: 'q2oCG7s0v6WMeG3i00FZQ2LOICi6' },
			photoURL: { type: 'string', example: 'http://user-photo.url' },
			providerUserInfo: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						displayName: { type: 'string', example: 'User Name' },
						email: { type: 'string', example: 'user.email@email.email' },
						federatedId: { type: 'string', example: '123456789012345678901' },
						photoUrl: { type: 'string', example: 'http://user-photo.url' },
						providerId: { type: 'string', example: 'google.com' },
						rawId: { type: 'string', example: '123456789012345678901' },
					},
				}
			},
			validSince: { type: 'string', example: '1700151976' },
		},
	},
};

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
				...bucketCreateInput,
				createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
				updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
			}
		},
		BucketCreateInput: {
			type: 'object',
			properties: { ...bucketCreateInput },
		},
		User: {
			type: 'object',
			properties: {
				id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
				...userCreateInput,
				createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
				updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
			},
		},
		UserCreateInput: {
			type: 'object',
			properties: {
				...userCreateInput
			},
		},
	},
};

module.exports = components;
