const express = require('express');
const bodyparser = require('body-parser');
const movieRouter = require('./routes/movie.routes');
const genreRouter = require('./routes/genre.routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/movies', movieRouter);

app.use('/genres', genreRouter);

app.get('/artists', (req, res) => {
	res.status(200).send('All Artists Data in JSON format from Mongo DB');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
