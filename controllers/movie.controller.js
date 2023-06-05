// Importing the 'Movie' model from the '../models' file
const { Movie } = require('../models');

/**
 * Retrieves all movies from the database based on the provided query parameters and sends them as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
exports.findAllMovies = async (req, res) => {
	try {
		const { status, title, genres, artists, start_date, end_date } =
			req.query;
		const query = {};

		if (status === 'PUBLISHED') {
			query.published = status === 'PUBLISHED';
		}
		if (status === 'RELEASED') {
			query.released = status === 'RELEASED';
		}
		if (title) {
			query.title = { $regex: new RegExp(title, 'i') };
		}
		if (genres) {
			query.genres = { $in: genres.split(',') };
		}
		if (artists) {
			const artistNames = artists.split(',');
			const artistQuery = artistNames.map((name) => {
				const [first_name, last_name] = name.trim().split(' ');
				return {
					'artists.first_name': {
						$regex: new RegExp(first_name, 'i'),
					},
					'artists.last_name': { $regex: new RegExp(last_name, 'i') },
				};
			});
			query.$or = artistQuery;
		}

		let response = await Movie.find(query);
		if (start_date) {
			let [year, month, date] = start_date.split('-');
			const startDate = [date, month, year].join('/');
			response = response.filter(
				(el) =>
					new Date(el.release_date).toLocaleDateString() > startDate,
			);
		}

		if (end_date) {
			let [year, month, date] = end_date.split('-');
			const endDate = [date, month, year].join('/');
			response = response.filter(
				(el) =>
					new Date(el.release_date).toLocaleDateString() < endDate,
			);
		}

		if (start_date && end_date) {
			let [year, month, date] = start_date.split('-');
			const startDate = [date, month, year].join('/');
			[year, month, date] = end_date.split('-');
			const endDate = [date, month, year].join('/');
			response = response.filter(
				(el) =>
					new Date(el.release_date).toLocaleDateString() >
						startDate &&
					new Date(el.release_date).toLocaleDateString() < endDate,
			);
		}

		res.status(200).json({
			status: 'success',
			message: 'OK',
			movies: response,
		});
	} catch (err) {
		console.log('Unexpected error occurred');
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

/**
 * Retrieves a specific movie from the database based on the provided movieid parameter and sends it as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
exports.findOne = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await Movie.find({ movieid: id });
		if (!data) {
			return res.status(404).json({
				status: 'failed',
				message: 'No such movieid exists.',
				movies: data,
			});
		}
		res.status(200).json(data);
	} catch (err) {
		console.log('Unexpected Error Occurred');
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

/**
 * Retrieves the shows for a specific movie from the database based on the provided movieid parameter and sends them as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
exports.findShows = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await Movie.find({ movieid: id });
		if (!data) {
			return res.status(404).json({
				status: 'failed',
				message: 'No such movieid exists.',
				movies: null,
			});
		}
		res.status(200).json(data);
	} catch (error) {
		console.log('Unexpected Error Occurred');
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
