const express = require('express');

const userRoutes = express.Router();

const { getUserInfo, updateUserProfile } = require('../controllers/users');

userRoutes.get('/me', getUserInfo);
userRoutes.patch('/me', updateUserProfile);

module.exports = { userRoutes };
