const { Artist } = require('../models');

exports.getArtists = async (req, res) => {
	res.status(200).send('All Artists Data in JSON format from Mongo DB');
};

exports.findAllArtists = async (req, res) => {
	try {
		const data = await Artist.find();
		res.status(200).json({ artists: data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
