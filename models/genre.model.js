// Importing the required modules from the mongoose package
const { model, Schema } = require('mongoose');

// Creating a new Mongoose schema for the 'Genre' collection
const genreSchema = new Schema({
	genreid: { type: Number, required: true }, // Field representing the unique genre ID, of type Number, which is required
	genre: { type: String, required: true }, // Field representing the genre name, of type String, which is required
});

// Creating a new Mongoose model based on the 'Genre' schema
const Genre = model('Genre', genreSchema);

// Exporting the 'Genre' model to make it accessible in other files
module.exports = Genre;
