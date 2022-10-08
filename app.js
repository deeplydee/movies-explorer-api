const express = require('express');
const mongoose = require('mongoose');

const { routes } = require('./routes');

const { PORT = 3000 } = process.env;

const { errorHandler } = require('./middlewares/error-handler');

const app = express();

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

app.use(errorHandler);
