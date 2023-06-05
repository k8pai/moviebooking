// Importing the required models from their respective files
const Artist = require('./artist.model');
const Genre = require('./genre.model');
const Movie = require('./movie.model');
const User = require('./user.model');

// Exporting the imported models as an object
module.exports = {
	Artist, // Exporting the 'Artist' model
	Genre, // Exporting the 'Genre' model
	Movie, // Exporting the 'Movie' model
	User, // Exporting the 'User' model
};
