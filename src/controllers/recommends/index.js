const express = require('express');
const { authMiddleware } = require('../../middlewares/auth-middleware');

const router = express.Router();

router.use(authMiddleware());

module.exports = router;
