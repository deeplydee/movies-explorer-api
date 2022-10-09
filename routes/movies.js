const express = require('express');

const movieRoutes = express.Router();

const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

const {
  validationAddMovie,
  validationMovieById,
} = require('../helpers/validation');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', validationAddMovie, addMovie);
movieRoutes.delete('/:_id', validationMovieById, deleteMovie);

module.exports = { movieRoutes };
