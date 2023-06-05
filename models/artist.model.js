// Importing required modules
const { model, Schema } = require('mongoose');

// Creating the artist schema
const artistSchema = new Schema({
	artistid: { type: Number, required: true }, // Unique ID for the artist
	first_name: { type: String, required: true }, // First name of the artist
	last_name: { type: String, required: true }, // Last name of the artist
	wiki_url: { type: String, required: true }, // URL to the artist's Wikipedia page
	profile_url: { type: String, required: true }, // URL to the artist's profile page
	movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }], // Array of movie references associated with the artist
});

// Creating the Artist model
const Artist = model('Artist', artistSchema);

// Exporting the Artist model
module.exports = Artist;
