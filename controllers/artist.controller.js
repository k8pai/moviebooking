// Importing the 'Artist' model from the '../models' file
const { Artist } = require('../models');

/**
 * Retrieves all artists from the database and sends them as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
exports.findAllArtists = async (req, res) => {
	try {
		const data = await Artist.find();
		res.status(200).json({ artists: data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
