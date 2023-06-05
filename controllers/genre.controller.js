// Importing the 'Genre' model from the '../models' file
const { Genre } = require('../models');

/**
 * Retrieves all genres from the database and sends them as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
exports.findAllGenres = async (req, res) => {
	try {
		const data = await Genre.find();
		res.status(200).json({ genres: data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
