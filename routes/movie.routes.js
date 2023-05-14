const { getMovies } = require('../controllers/movie.controller');
const movieRouter = require('express').Router();

movieRouter.get('/', getMovies);

module.exports = movieRouter;
