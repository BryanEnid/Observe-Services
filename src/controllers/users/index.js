const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../utils/error-wrapper');
const { getUserByIdRoute } = require('./get');
const { getUsersListRoute } = require('./list');
const { createUserRoute, createUserValidation } = require('./create');
const { updateUserRoute, updateUserValidation } = require('./update');
const { deleteUserRoute } = require('./delete');

const router = express.Router();

router.get('/', errorWrapper(getUsersListRoute));
router.get('/:id', errorWrapper(getUserByIdRoute));
router.post('/', express.json(), celebrate(createUserValidation), errorWrapper(createUserRoute));
router.put('/:id', express.json(), celebrate(updateUserValidation), errorWrapper(updateUserRoute));
router.delete('/:id', errorWrapper(deleteUserRoute));

module.exports = router;
