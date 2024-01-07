const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../utils/error-wrapper');
const defaultSchemaOptions = require('../../utils/celebrate');
const { getUserRoute, getUserValidator } = require('./get-user');

const router = express.Router();

router.get('/getUser', celebrate(getUserValidator, defaultSchemaOptions), errorWrapper(getUserRoute));

module.exports = router;
