// Importing the required modules and controller functions
const {
	signUp,
	login,
	logout,
	getCouponCode,
	bookShow,
} = require('../controllers/user.controller');

// Creating a router instance
const userRouter = require('express').Router();

// Route for user signup
userRouter.post('/auth/signup', signUp);

// Route for user login
userRouter.post('/auth/login', login);

// Route for user logout
userRouter.post('/auth/logout', logout);

// Route for getting coupon codes
userRouter.get('/auth/coupons', getCouponCode);

// Route for booking a show
userRouter.post('/auth/bookings', bookShow);

// Exporting the router
module.exports = userRouter;
