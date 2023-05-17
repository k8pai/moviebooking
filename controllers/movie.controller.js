const { Movie } = require('../models');

exports.getMovies = async (req, res) => {
	res.status(200).send('All Movies Data in JSON format from Mongo DB');
};

// ?status=RELEASED&title={title}&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}
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
			console.log('artists = ', artists);
			const names = artists.split(',');
			console.log('names = ', names);
			query['artists.first_name'] = { $regex: new RegExp(artists, 'i') };
		}

		if (start_date && end_date) {
			query.release_date = {
				$gte: new Date(start_date),
				$lte: new Date(end_date),
			};
		}

		const response = await Movie.find(query);
		res.status(200).json({
			status: 'success',
			message: 'OK',
			movies: response,
		});
	} catch (err) {
		console.log('Unexpected error occured');
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.findOne = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await Movie.findOne({ movieid: id });
		if (!data) {
			return res.status(404).json({
				status: 'failed',
				message: 'No such movieid exists.',
				movies: data,
			});
		}
		res.status(200).json({
			status: 'success',
			message: 'OK',
			movies: data,
		});
	} catch (err) {
		console.log('Unexpected Error Occured');
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.findShows = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await Movie.findOne({ movieid: id });
		if (!data) {
			return res.status(404).json({
				status: 'failed',
				message: 'No such movieid exists.',
				movies: null,
			});
		}
		res.status(200).json({
			status: 'success',
			message: 'OK',
			movies: data?.shows,
		});
	} catch (error) {
		console.log('Unexpected Error Occured');
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
