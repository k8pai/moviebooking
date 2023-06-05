// Importing the required modules and controller function
const { findAllArtists } = require('../controllers/artist.controller');

// Creating a router instance
const artistsRouter = require('express').Router();

// Route for fetching all artists
artistsRouter.get('/artists', findAllArtists);

// Exporting the router
module.exports = artistsRouter;
