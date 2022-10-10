const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const {
  CREATED_CODE,
  ID_ERR_MESSAGE,
  EMAIL_ERR_MESSAGE,
  VALIDATION_ERR_MESSAGE,
  CREDENTIALS_ERR_MESSAGE,
} = require('../helpers/constants');

const BadRequestError = require('../helpers/errors/bad-request-error');
const UnauthorizedError = require('../helpers/errors/unauthorized-error');
const NotFoundError = require('../helpers/errors/not-found-error');
const ConflictError = require('../helpers/errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const { JWT_SECRET_DEV } = require('../helpers/config');

const createUser = async (req, res, next) => { // POST '/users/signup'
  const {
    name,
    email,
    password,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(CREATED_CODE).send({
      data: user.toJSON(),
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(VALIDATION_ERR_MESSAGE));
      return;
    }
    if (err.code === 11000) {
      next(new ConflictError(EMAIL_ERR_MESSAGE));
      return;
    }
    next(err);
  }
};

const login = async (req, res, next) => { // POST '/users/signin'
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
      { expiresIn: '7d' },
    );
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      // sameSite: 'none',
      // secure: true,
    }).send({ data: user.toJSON() });
  } catch (err) {
    next(new UnauthorizedError(CREDENTIALS_ERR_MESSAGE));
  }
};

const getUserInfo = async (req, res, next) => { // GET '/users/me'
  try {
    const user = await User.findById({ _id: req.user._id })
      .orFail(() => next(new NotFoundError(ID_ERR_MESSAGE)));
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => { // PATCH '/users/me'
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { name, email },
      { new: true, runValidators: true },
    )
      .orFail(() => next(new NotFoundError(ID_ERR_MESSAGE)));
    res.send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(VALIDATION_ERR_MESSAGE));
      return;
    }
    if (err.code === 11000) {
      next(new ConflictError(EMAIL_ERR_MESSAGE));
      return;
    }
    next(err);
  }
};

const signOut = (req, res) => { // GET 'signout'
  res.clearCookie('jwt').send();
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateUserProfile,
  signOut,
};
