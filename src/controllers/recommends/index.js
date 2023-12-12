const express = require('express');

const { authMiddleware } = require('../../middlewares/auth-middleware');
const errorWrapper = require('../../utils/error-wrapper');
const { getRecommendsRoute } = require('./get');

const router = express.Router();

router.use(authMiddleware());
router.get('/findByUser/:userId', errorWrapper(getRecommendsRoute));

module.exports = router;
