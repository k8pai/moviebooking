// Importing the required modules and controller function
const {
	findAllMovies,
	findOne,
	findShows,
} = require('../controllers/movie.controller');

// Creating a router instance
const movieRouter = require('express').Router();

// Route for fetching all movies
movieRouter.get('/movies', findAllMovies);
movieRouter.get('/movies/:id', findOne);
movieRouter.get('/movies/:id/shows', findShows);

// Exporting the router
module.exports = movieRouter;
