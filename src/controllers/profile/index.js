const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../utils/error-wrapper');
const defaultSchemaOptions = require('../../utils/celebrate');
const { authMiddleware } = require('../../middlewares/auth-middleware');
const { uploadToS3 } = require('../../utils/upload');

const { getProfileByIdRoute } = require('./get');
const { createProfileRoute, createProfileValidation } = require('./create');
const { updateProfileRoute, updateProfileValidation } = require('./update');

const { updateAboutRoute, updateAboutValidation } = require('./about/update');

const { createSkillRoute, createSkillValidation } = require('./skills/create');
const { updateSkillRoute, updateSkillValidation } = require('./skills/update');
const { deleteSkillRoute } = require('./skills/delete');

const { createCareerHistoryRoute, createCareerHistoryValidation } = require('./careerHistory/create');
const { updateCareerHistoryRoute, updateCareerHistoryValidation } = require('./careerHistory/update');
const { uploadCareerLogoRoute } = require('./careerHistory/upload-company-logo');
const { deleteCareerHistoryRoute } = require('./careerHistory/delete');

const { createCertificationRoute, createCertificationValidation } = require('./certifications/create');
const { updateCertificationRoute, updateCertificationValidation } = require('./certifications/update');
const { uploadProviderLogoRoute } = require('./certifications/upload-provider-logo');
const { deleteCertificationRoute } = require('./certifications/delete');

const { uploadAttachmentRoute } = require('./attachments/upload');
const { deleteAttachmentRoute } = require('./attachments/delete');

const router = express.Router();

router.use(authMiddleware());
router.get('/:id', errorWrapper(getProfileByIdRoute));
router.post(
  '/',
  express.json(),
  celebrate(createProfileValidation, defaultSchemaOptions),
  errorWrapper(createProfileRoute),
);
router.put(
  '/:id',
  express.json(),
  celebrate(updateProfileValidation, defaultSchemaOptions),
  errorWrapper(updateProfileRoute),
);

router.put(
  '/:id/about',
  express.json(),
  celebrate(updateAboutValidation, defaultSchemaOptions),
  errorWrapper(updateAboutRoute),
);

router.post(
  '/:id/skills',
  express.json(),
  celebrate(createSkillValidation, defaultSchemaOptions),
  errorWrapper(createSkillRoute),
);
router.put(
  '/:id/skills/:skillId',
  express.json(),
  celebrate(updateSkillValidation, defaultSchemaOptions),
  errorWrapper(updateSkillRoute),
);
router.delete(
  '/:id/skills/:skillId',
  errorWrapper(deleteSkillRoute),
);

router.post(
  '/:id/career-history',
  express.json(),
  celebrate(createCareerHistoryValidation, defaultSchemaOptions),
  errorWrapper(createCareerHistoryRoute),
);
router.put(
  '/:id/career-history/:historyId',
  express.json(),
  celebrate(updateCareerHistoryValidation, defaultSchemaOptions),
  errorWrapper(updateCareerHistoryRoute),
);
router.put(
  '/:id/career-history/:historyId/upload',
  uploadToS3.single('companyLogo'),
  errorWrapper(uploadCareerLogoRoute),
);
router.delete(
  '/:id/career-history/:historyId',
  errorWrapper(deleteCareerHistoryRoute),
);

router.post(
  '/:id/certifications',
  express.json(),
  celebrate(createCertificationValidation, defaultSchemaOptions),
  errorWrapper(createCertificationRoute),
);
router.put(
  '/:id/certifications/:certificationId',
  express.json(),
  celebrate(updateCertificationValidation, defaultSchemaOptions),
  errorWrapper(updateCertificationRoute),
);
router.put(
  '/:id/certifications/:certificationId/upload',
  uploadToS3.single('providerLogo'),
  errorWrapper(uploadProviderLogoRoute),
);
router.delete(
  '/:id/certifications/:certificationId',
  errorWrapper(deleteCertificationRoute),
);

router.post(
  '/:id/attachments',
  uploadToS3.fields([{ name: 'file', maxCount: 1 }, { name: 'preview', maxCount: 1 }]),
  errorWrapper(uploadAttachmentRoute),
);
router.delete(
  '/:id/attachments/:attachmentId',
  errorWrapper(deleteAttachmentRoute),
);

module.exports = router;
