// Importing the required modules from the mongoose package
const { Schema, model } = require('mongoose');

// Defining the schema for the 'artist' collection
const artistSchema = new Schema({
	artistid: { type: Number, required: true }, // Field representing the unique artist ID, of type Number, which is required
	first_name: { type: String, required: true }, // Field representing the first name of the artist, of type String, which is required
	last_name: { type: String, required: true }, // Field representing the last name of the artist, of type String, which is required
	wiki_url: { type: String, required: true }, // Field representing the Wikipedia URL of the artist, of type String, which is required
	profile_url: { type: String, required: true }, // Field representing the profile URL of the artist, of type String, which is required
	movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }], // Field representing an array of movie references associated with the artist
});

// Defining the schema for the 'show' collection
const showSchema = new Schema({
	id: { type: Number, required: true }, // Field representing the unique show ID, of type Number, which is required
	theatre: {
		// Field representing the theatre details for the show
		name: { type: String, required: true }, // Field representing the name of the theatre, of type String, which is required
		city: { type: String, required: true }, // Field representing the city where the theatre is located, of type String, which is required
	},
	language: { type: String, required: true }, // Field representing the language of the show, of type String, which is required
	show_timing: { type: Date, required: true }, // Field representing the timing of the show, of type Date, which is required
	available_seats: { type: String, required: true }, // Field representing the available seats for the show, of type String, which is required
	unit_price: { type: Number, required: true }, // Field representing the unit price of the show, of type Number, which is required
});

// Defining the schema for the 'movie' collection
const movieSchema = new Schema({
	movieid: { type: Number, required: true }, // Field representing the unique movie ID, of type Number, which is required
	title: { type: String, required: true }, // Field representing the title of the movie, of type String, which is required
	published: { type: Boolean, required: true }, // Field representing the publication status of the movie, of type Boolean, which is required
	released: { type: Boolean, required: true }, // Field representing the release status of the movie, of type Boolean, which is required
	poster_url: { type: String, required: true }, // Field representing the URL of the movie poster, of type String, which is required
	release_date: { type: Date, required: true }, // Field representing the release date of the movie, of type Date, which is required
	publish_date: { type: Date, required: true }, // Field representing the publish date of the movie, of type Date, which is required
	artists: [artistSchema], // Field representing an array of artist subdocuments associated with the movie
	genres: [{ type: String, required: true }], // Field representing an array of genre names associated with the movie, of type String, which is required
	duration: { type: Number, required: true }, // Field representing the duration of the movie in minutes, of type Number, which is required
	critic_rating: { type: Number, required: true }, // Field representing the critic rating of the movie, of type Number, which is required
	trailer_url: { type: String, required: true }, // Field representing the URL of the movie trailer, of type String, which is required
	wiki_url: { type: String, required: true }, // Field representing the Wikipedia URL of the movie, of type String, which is required
	story_line: { type: String, required: true }, // Field representing the story line of the movie, of type String, which is required
	shows: [showSchema], // Field representing an array of show subdocuments associated with the movie
});

// Creating a new Mongoose model based on the 'movieSchema'
const Movie = model('Movie', movieSchema);

// Exporting the 'Movie' model to make it accessible in other files
module.exports = Movie;
