const { INTERNAL_SERVER_ERROR_CODE, SERVER_ERR_MESSAGE } = require('../helpers/constants');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR_CODE, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR_CODE
        ? SERVER_ERR_MESSAGE
        : message,
  });

  next();
};
