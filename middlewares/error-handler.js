const { INTERNAL_SERVER_ERROR_CODE, serverErrorMessage } = require('../helpers/constants');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR_CODE, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR_CODE
        ? serverErrorMessage
        : message,
  });

  next();
};
