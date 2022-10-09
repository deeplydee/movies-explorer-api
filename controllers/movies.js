const mongoose = require('mongoose');

const Movie = require('../models/movie');

const {
  CREATED_CODE,
  VALIDATION_ERR_MESSAGE,
  FORBIDDEN_ERR_MESSAGE,
  NOT_FOUND_ERR_MESSAGE,
} = require('../helpers/constants');

const BadRequestError = require('../helpers/errors/bad-request-error');
const ForbiddenError = require('../helpers/errors/forbidden-error');
const NotFoundError = require('../helpers/errors/not-found-error');

const getMovies = async (req, res, next) => { // GET '/movies'
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send({ data: movies });
  } catch (err) {
    next(err);
  }
};

const addMovie = async (req, res, next) => { // POST '/movies'
  try {
    const movie = await Movie.create({ ...req.body, owner: req.user._id });
    res.status(CREATED_CODE).send({ data: movie });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(VALIDATION_ERR_MESSAGE));
      return;
    }
    next(err);
  }
};

const deleteMovie = async (req, res, next) => { // DELETE '/movies/_id'
  try {
    const movie = await Movie.findById({ _id: req.params._id })
      .orFail(() => next(new NotFoundError(NOT_FOUND_ERR_MESSAGE)));
    if (movie.owner.toString() !== req.user._id) {
      next(new ForbiddenError(FORBIDDEN_ERR_MESSAGE));
      return;
    }
    const delMovie = await Movie.findByIdAndRemove({ _id: req.params._id });
    res.send({ data: delMovie });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError(VALIDATION_ERR_MESSAGE));
      return;
    }
    next(err);
  }
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
