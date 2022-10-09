const express = require('express');
const cookieParser = require('cookie-parser');

const routes = express.Router();

const { NOT_FOUND_ERR_MESSAGE } = require('../helpers/constants');

const NotFoundError = require('../helpers/errors/not-found-error');

const { createUser, login, signOut } = require('../controllers/users');

const auth = require('../middlewares/auth');

const { userRoutes } = require('./users');
const { movieRoutes } = require('./movies');

const {
  validationCreateUser,
  validationLogin,
} = require('../helpers/validation');

routes.use(express.json());
routes.use(cookieParser());

routes.use('/signup', validationCreateUser, createUser);
routes.use('/signin', validationLogin, login);
routes.use('/signout', signOut);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);

routes.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERR_MESSAGE));
});

module.exports = { routes };
