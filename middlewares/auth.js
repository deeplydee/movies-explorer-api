const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { JWT_SECRET_DEV } = require('../helpers/config');

const { AUTH_ERR_MESSAGE } = require('../helpers/constants');

const UnauthorizedError = require('../helpers/errors/unauthorized-error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError(AUTH_ERR_MESSAGE));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
    );
  } catch (err) {
    next(new UnauthorizedError(AUTH_ERR_MESSAGE));
    return;
  }

  req.user = payload;

  next();
};

module.exports = auth;
