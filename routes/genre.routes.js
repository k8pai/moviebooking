const { getGenres } = require('../controllers/genre.controller');
const genreRouter = require('express').Router();

genreRouter.get('/', getGenres);

module.exports = genreRouter;
