const movieRouter = require('express').Router();
const getMovies = require('../controllers/movie.controller');

movieRouter.get('/', getMovies);

module.exports = movieRouter;
