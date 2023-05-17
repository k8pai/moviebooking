const { getGenres, findAllGenres } = require('../controllers/genre.controller');
const genreRouter = require('express').Router();

genreRouter.get('/', getGenres);
genreRouter.get('/genres', findAllGenres);
module.exports = genreRouter;
