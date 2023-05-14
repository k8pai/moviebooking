const artistsRouter = require('express').Router();
const { getArtists } = require('../controllers/artist.controller');

artistsRouter.get('/', getArtists);

module.exports = artistsRouter;
