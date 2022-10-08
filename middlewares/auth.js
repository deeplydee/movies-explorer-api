const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../helpers/errors/unauthorized-error');

const { authErrorMessage } = require('../helpers/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError(authErrorMessage));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key',
    );
  } catch (err) {
    next(new UnauthorizedError(authErrorMessage));
    return;
  }

  req.user = payload;

  next();
};

module.exports = auth;
