const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const movieRouter = require('./routes/movie.routes');
const genreRouter = require('./routes/genre.routes');
const artistRouter = require('./routes/artist.routes');
const { Artist, Genre, User, Movie } = require('./models');
const mongoose = require('mongoose');
const { url } = require('./config/db.config');

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/movies', movieRouter);

app.use('/genres', genreRouter);

app.use('/artists', artistRouter);

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to the database!');
	})
	.catch((err) => {
		console.log('Cannot connect to the database!', err);
		process.exit();
	});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
