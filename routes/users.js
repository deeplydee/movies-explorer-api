const express = require('express');

const userRoutes = express.Router();

const { getUserInfo, updateUserProfile } = require('../controllers/users');

const { validationUpdateUserProfile } = require('../helpers/validation');

userRoutes.get('/me', getUserInfo);
userRoutes.patch('/me', validationUpdateUserProfile, updateUserProfile);

module.exports = { userRoutes };
