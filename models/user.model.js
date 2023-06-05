// Importing the required modules from the mongoose package
const { Schema, model } = require('mongoose');

// Defining the schema for the 'user' collection
const userSchema = new Schema({
	userid: { type: Number, required: true }, // Field representing the unique user ID, of type Number, which is required
	email: { type: String, required: true }, // Field representing the email address of the user, of type String, which is required
	first_name: { type: String, required: true }, // Field representing the first name of the user, of type String, which is required
	last_name: { type: String, required: true }, // Field representing the last name of the user, of type String, which is required
	username: { type: String, required: true }, // Field representing the username of the user, of type String, which is required
	contact: { type: String, required: true }, // Field representing the contact number of the user, of type String, which is required
	password: { type: String, required: true }, // Field representing the password of the user, of type String, which is required
	role: String, // Field representing the role of the user, of type String
	isLoggedIn: Boolean, // Field representing the login status of the user, of type Boolean
	uuid: String, // Field representing the UUID (Universally Unique Identifier) of the user, of type String
	accesstoken: String, // Field representing the access token of the user, of type String
	coupens: [
		// Field representing an array of coupons associated with the user
		{
			id: Number, // Field representing the unique ID of the coupon, of type Number
			discountValue: Number, // Field representing the discount value of the coupon, of type Number
		},
	],
	bookingRequests: [
		// Field representing an array of booking requests made by the user
		{
			reference_number: Number, // Field representing the unique reference number of the booking request, of type Number
			coupon_code: Number, // Field representing the coupon code associated with the booking request, of type Number
			show_id: Number, // Field representing the unique ID of the show associated with the booking request, of type Number
			tickets: [Number], // Field representing an array of ticket numbers associated with the booking request, of type Number
		},
	],
});

// Creating a new Mongoose model based on the 'userSchema'
const User = model('User', userSchema);

// Exporting the 'User' model to make it accessible in other files
module.exports = User;
