// Importing the required modules and controller function
const { findAllGenres } = require('../controllers/genre.controller');

// Creating a router instance
const genreRouter = require('express').Router();

// Route for fetching all genres
genreRouter.get('/genres', findAllGenres);

// Exporting the router
module.exports = genreRouter;
