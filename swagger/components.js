const coordsObject = {
  x: { type: 'number', example: 100 },
  y: { type: 'number', example: 200 },
};
const answerObject = {
  coords: {
    type: 'object',
    properties: { ...coordsObject },
  },
  text: { type: 'string', example: 'Answer text' },
};

const videoQuestionCreateInput = {
  coords: {
    type: 'object',
    properties: { ...coordsObject },
  },
  text: { type: 'string', example: 'Question text?' },
};
const videoQuestionObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  creatorId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...videoQuestionCreateInput,
  answer: {
    type: 'object',
    properties: { ...answerObject },
  },
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const videoPollCreateInput = {
  coords: {
    type: 'object',
    properties: { ...coordsObject },
  },
  text: { type: 'string', example: 'Poll text?' },
  options: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        text: { type: 'string', example: 'Poll option' },
      },
    },
  },
};
const videoPollObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  creatorId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...videoPollCreateInput,
  answer: {
    type: 'object',
    properties: { ...answerObject },
  },
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};
const bucketVideoCreateInput = {
  image: { type: 'string', example: 'http://url' },
  videoUrl: { type: 'string', example: 'http://url' },
  chosen: { type: 'boolean', example: false },
  selected: { type: 'boolean', example: false },
  description: { type: 'string', example: 'Video Description' },
  contributors: {
    type: 'array',
    items: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  },
  videoType: { type: 'string', example: 'VR' },
};
const bucketVideoObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...bucketVideoCreateInput,
  questions: {
    type: 'array',
    items: {
      type: 'object',
      properties: { ...videoQuestionObject },
    },
  },
  polls: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        creatorId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
        coords: {
          type: 'object',
          properties: { ...coordsObject },
        },
        text: { type: 'string', example: 'Poll text?' },
        answer: {
          type: 'object',
          properties: { ...answerObject },
        },
      },
    },
  },
  process: {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'PROCESSING' },
      percent: { type: 'number', example: 33.44 },
      errorMessage: { type: 'string', example: '' },
    },
  },
  pollQuestions: { type: 'boolean', example: false },
  views: { type: 'number', example: 0 },
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const bucketCreateInput = {
  name: { type: 'string', example: 'My Bucket' },
  title: { type: 'string', example: 'My Bucket Title' },
  description: { type: 'string', example: 'My Bucket Description' },
  category: { type: 'string', example: 'Tools Category' },
  videos: {
    type: 'array',
    items: {
      type: 'object',
      properties: { ...bucketVideoCreateInput },
    },
  },
};
const bucketObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  creatorId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...bucketCreateInput,
  videos: {
    type: 'array',
    items: {
      type: 'object',
      properties: { ...bucketVideoObject },
    },
  },
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
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
        },
      },
      validSince: { type: 'string', example: '1700151976' },
    },
  },
};

const userObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...userCreateInput,
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const skillCreateInput = {
  label: { type: 'string', example: 'React' },
  iconUrl: { type: 'string', example: '' },
  iconCode: { type: 'string', example: ':react:' },
};

const skillObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...skillCreateInput,
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const careerHistoryCreateInput = {
  label: { type: 'string', example: 'CEO' },
  company: { type: 'string', example: 'Tesla' },
  companyLogoUrl: { type: 'string', example: 'https://....' },
  startDate: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  endDate: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  currentCompany: { type: 'boolean', example: false },
  bucketId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
};
const careerHistoryObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...careerHistoryCreateInput,
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const certificationCreateInput = {
  title: { type: 'string', example: 'AWS' },
  provider: { type: 'string', example: 'aws.amazon.com' },
  providerLogoUrl: { type: 'string', example: '' },
  endDate: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};
const certificationObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...certificationCreateInput,
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const attachmentCreateInput = {
  fileUrl: { type: 'string', example: 'https://....' },
  previewUrl: { type: 'string', example: 'https://....' },
};

const attachmentObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...attachmentCreateInput,
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const profileCreateInput = {
  about: {
    type: 'array',
    items: { type: 'string' },
  },
  skills: {
    type: 'array',
    items: {
      type: 'object',
      $ref: '#/components/schemas/SkillCreateInput',
    },
  },
  careerHistory: {
    type: 'array',
    items: {
      type: 'object',
      $ref: '#/components/schemas/CareerHistoryCreateInput',
    },
  },
  certifications: {
    type: 'array',
    items: {
      type: 'object',
      $ref: '#/components/schemas/CertificationCreateInput',
    },
  },
  attachments: {
    type: 'array',
    items: {
      type: 'object',
      $ref: '#/components/schemas/AttachmentCreateInput',
    },
  },
};

const profileObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  userId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...profileCreateInput,
  skills: {
    type: 'array',
    items: {
      type: 'object',
      $ref: '#/components/schemas/Skill',
    },
  },
  careerHistory: {
    type: 'array',
    items: {
      type: 'object',
      $ref: '#/components/schemas/CareerHistory',
    },
  },
  certifications: {
    type: 'array',
    items: {
      type: 'object',
      $ref: '#/components/schemas/Certification',
    },
  },
  attachments: {
    type: 'array',
    items: {
      type: 'object',
      $ref: '#/components/schemas/Attachment',
    },
  },
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const toolCreateInput = {
  title: { type: 'string' },
  description: { type: 'string' },
  category: { type: 'string' },
  picture: { type: 'string', example: 'https://image.url' },
};
const toolObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  creatorId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...toolCreateInput,
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const peopleCreateInput = {
  name: { type: 'string' },
  picture: { type: 'string', example: 'https://image.url' },
};
const peopleObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  creatorId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...peopleCreateInput,
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const videoCreateInput = {
  url: { type: 'string', example: 'https://video.url' },
};
const videoObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  creatorId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  title: { type: 'string' },
  description: { type: 'string' },
  duration: { type: 'string', example: 'PT10M30S' },
  videoUrl: { type: 'string' },
  preview: { type: 'string', example: 'https://image.url' },
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const articleCreateInput = {
  url: { type: 'string', example: 'https://article.url' },
};
const articleObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  creatorId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  url: { type: 'string' },
  title: { type: 'string' },
  description: { type: 'string' },
  readingTime: { type: 'string', example: 'PT10M30S' },
  picture: { type: 'string', example: 'https://image.url' },
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const bookPhotoCreateInput = {
  description: { type: 'string' },
  imgUrl: { type: 'string', example: 'https://image.url' },
};
const bookPhotoObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...bookPhotoCreateInput,
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};
const bookCreateInput = {
  title: { type: 'string' },
  description: { type: 'string' },
  readingTime: { type: 'string', example: 'PT1H30M' },
  photos: {
    type: 'array',
    items: {
      type: 'object',
      properties: { ...bookPhotoCreateInput },
    },
  },
};
const bookObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  creatorId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...bookCreateInput,
  photos: {
    type: 'array',
    items: {
      type: 'object',
      properties: { ...bookPhotoObject },
    },
  },
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const quotCreateInput = {
  text: { type: 'string' },
};
const quotObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  creatorId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...quotCreateInput,
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const saveForLaterCreateInput = {
  books: {
    type: 'array',
    items: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  },
};
const saveForLaterObject = {
  id: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  userId: { type: 'string', example: '655b1c6ce664a8d355324cb8' },
  ...saveForLaterCreateInput,
  createdAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
  updatedAt: { type: 'string', example: '2023-11-21T10:47:55.753Z' },
};

const components = {
  securitySchemes: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      in: 'header',
    },
  },
  schemas: {
    Bucket: {
      type: 'object',
      properties: {
        ...bucketObject,
      },
    },
    BucketCreateInput: {
      type: 'object',
      properties: { ...bucketCreateInput },
    },
    VideoQuestion: {
      type: 'object',
      properties: { ...videoQuestionObject },
    },
    VideoQuestionCreateInput: {
      type: 'object',
      properties: { ...videoQuestionCreateInput },
    },
    VideoPoll: {
      type: 'object',
      properties: { ...videoPollObject },
    },
    VideoPollCreateInput: {
      type: 'object',
      properties: { ...videoPollCreateInput },
    },
    QuestionAnswer: {
      type: 'object',
      properties: { ...answerObject },
    },
    User: {
      type: 'object',
      properties: { ...userObject },
    },
    UserCreateInput: {
      type: 'object',
      properties: { ...userCreateInput },
    },
    Profile: {
      type: 'object',
      properties: { ...profileObject },
    },
    ProfileCreateInput: {
      type: 'object',
      properties: { ...profileCreateInput },
    },
    Skill: {
      type: 'object',
      properties: { ...skillObject },
    },
    SkillCreateInput: {
      type: 'object',
      properties: { ...skillCreateInput },
    },
    CareerHistory: {
      type: 'object',
      properties: { ...careerHistoryObject },
    },
    CareerHistoryCreateInput: {
      type: 'object',
      properties: { ...careerHistoryCreateInput },
    },
    Certification: {
      type: 'object',
      properties: { ...certificationObject },
    },
    CertificationCreateInput: {
      type: 'object',
      properties: { ...certificationCreateInput },
    },
    Attachment: {
      type: 'object',
      properties: { ...attachmentObject },
    },
    AttachmentCreateInput: {
      type: 'object',
      properties: { ...attachmentCreateInput },
    },
    Tool: {
      type: 'object',
      properties: { ...toolObject },
    },
    ToolCreateInput: {
      type: 'object',
      properties: { ...toolCreateInput },
    },
    People: {
      type: 'object',
      properties: { ...peopleObject },
    },
    PeopleCreateInput: {
      type: 'object',
      properties: { ...peopleCreateInput },
    },
    Video: {
      type: 'object',
      properties: { ...videoObject },
    },
    VideoCreateInput: {
      type: 'object',
      properties: { ...videoCreateInput },
    },
    Article: {
      type: 'object',
      properties: { ...articleObject },
    },
    ArticleCreateInput: {
      type: 'object',
      properties: { ...articleCreateInput },
    },
    BookPhoto: {
      properties: { ...bookPhotoObject },
    },
    BookPhotoCreateInput: {
      type: 'object',
      properties: { ...bookPhotoCreateInput },
    },
    Book: {
      type: 'object',
      properties: { ...bookObject },
    },
    BookCreateInput: {
      type: 'object',
      properties: { ...bookCreateInput },
    },
    Quot: {
      type: 'object',
      properties: { ...quotObject },
    },
    QuotCreateInput: {
      type: 'object',
      properties: { ...quotCreateInput },
    },
    SaveForLater: {
      type: 'object',
      properties: { ...saveForLaterObject },
    },
    SaveForLaterCreateInput: {
      type: 'object',
      properties: { ...saveForLaterCreateInput },
    },
  },
};

module.exports = components;
