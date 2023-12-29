const express = require('express');
const { celebrate } = require('celebrate');

const errorWrapper = require('../../utils/error-wrapper');
const { authMiddleware } = require('../../middlewares/auth-middleware');
const { getUserByIdRoute } = require('./get');
const { getUsersListRoute } = require('./list');
const { createUserRoute, createUserValidation } = require('./create');
const { updateUserRoute, updateUserValidation } = require('./update');
const { deleteUserRoute } = require('./delete');

const router = express.Router();

// router.get('/', authMiddleware(), errorWrapper(getUsersListRoute));
router.get('/', errorWrapper(getUsersListRoute));
// router.get('/:id', authMiddleware(), errorWrapper(getUserByIdRoute));
router.get('/:id', errorWrapper(getUserByIdRoute));
router.post('/', express.json(), celebrate(createUserValidation), errorWrapper(createUserRoute));
router.put('/:id', authMiddleware(), express.json(), celebrate(updateUserValidation), errorWrapper(updateUserRoute));
router.delete('/:id', authMiddleware(), errorWrapper(deleteUserRoute));

module.exports = router;
