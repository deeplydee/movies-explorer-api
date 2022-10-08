const express = require('express');
const cookieParser = require('cookie-parser');

const auth = require('../middlewares/auth');

const { createUser, login, signOut } = require('../controllers/users');

const NotFoundError = require('../helpers/errors/not-found-error');

const routes = express.Router();

const { userRoutes } = require('./users');

routes.use(express.json());
routes.use(cookieParser());

routes.use('/signup', createUser);
routes.use('/signin', login);
routes.use('/signout', signOut);

routes.use(auth);

routes.use('/users', userRoutes);

routes.use((req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

module.exports = { routes };
