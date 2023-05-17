const {
	getMovies,
	findAllMovies,
	findOne,
	findShows,
	findPublished,
	findReleased,
} = require('../controllers/movie.controller');
const movieRouter = require('express').Router();

movieRouter.get('/movies', findAllMovies);
movieRouter.get('/movies/:id', findOne);
movieRouter.get('/movies/:id/shows', findShows);
// movieRouter.get('/all', findAllMovies);

module.exports = movieRouter;
