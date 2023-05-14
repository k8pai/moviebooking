const { getArtists } = require('../controllers/artist.controller');
const artistsRouter = require('express').Router();

artistsRouter.get('/', getArtists);

module.exports = artistsRouter;
