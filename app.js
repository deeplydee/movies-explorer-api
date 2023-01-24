require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const { PORT = 3000, NODE_ENV, MONGO_DB } = process.env;

const { MONGO_DB_DEV } = require('./helpers/config');

const { routes } = require('./routes');

const rateLimit = require('./middlewares/rate-limit');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { errorHandler } = require('./middlewares/error-handler');

const app = express();

app.use(cors({
  origin: ['http://movies.deeplydee.nomoredomains.icu', 'https://movies.deeplydee.nomoredomains.icu'],
  // origin: ['http://localhost:3001', 'https://localhost:3001'],
  credentials: true,
}));

app.use(helmet());

app.use(requestLogger);

app.use(rateLimit);

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
