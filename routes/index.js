const express = require('express');
const cookieParser = require('cookie-parser');

const auth = require('../middlewares/auth');

const { createUser, login, signOut } = require('../controllers/users');

const NotFoundError = require('../helpers/errors/not-found-error');

const { notFoundErrorMessage } = require('../helpers/constants');

const routes = express.Router();

const { userRoutes } = require('./users');

const { validationCreateUser, validationLogin } = require('../helpers/validation');

routes.use(express.json());
routes.use(cookieParser());

routes.use('/signup', validationCreateUser, createUser);
routes.use('/signin', validationLogin, login);
routes.use('/signout', signOut);

routes.use(auth);

routes.use('/users', userRoutes);

routes.use((req, res, next) => {
  next(new NotFoundError(notFoundErrorMessage));
});

module.exports = { routes };
