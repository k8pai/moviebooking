// Importing required modules
const express = require('express');
const cors = require('cors');
const { connect: dbConnect } = require('mongoose');
const { url } = require('./config/db.config');

// Importing routes
const movieRouter = require('./routes/movie.routes');
const genreRouter = require('./routes/genre.routes');
const artistRouter = require('./routes/artist.routes');
const userRouter = require('./routes/user.routes');

// Creating an Express application
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Default route
app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to Upgrad Movie booking application development.',
	});
});

// Routes
app.use('/api', movieRouter); // Movies API routes
app.use('/api', genreRouter); // Genres API routes
app.use('/api', artistRouter); // Artists API routes
app.use('/api', userRouter); // Users API routes

// Connect to MongoDB database
dbConnect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('Connected to the database!');
	})
	.catch((err) => {
		console.log('Cannot connect to the database!', err);
		process.exit();
	});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
