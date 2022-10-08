const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { routes } = require('./routes');

const { PORT = 3000 } = process.env;

const { errorHandler } = require('./middlewares/error-handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(requestLogger);

app.use(routes);

const main = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/moviesdb');
    app.listen(PORT);
  } catch (err) {
    console.log(err.message);
  }
};

main();

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
