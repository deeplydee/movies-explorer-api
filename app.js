require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { routes } = require('./routes');

const { MONGO_DB_DEV } = require('./helpers/config');

const { PORT = 3000, NODE_ENV, MONGO_DB } = process.env;

const { errorHandler } = require('./middlewares/error-handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(helmet());

app.use(requestLogger);

app.use(routes);

const main = async () => {
  try {
    await mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : MONGO_DB_DEV);
    app.listen(PORT);
  } catch (err) {
    console.log(err.message);
  }
};

main();

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
