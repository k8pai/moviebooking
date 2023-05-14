const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	userid: { type: Number, required: true },
	email: { type: String, required: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	username: { type: String, required: true },
	contact: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
	isLoggedIn: { type: Boolean, required: true },
	uuid: { type: String, required: true },
	accesstoken: { type: String, required: true },
	coupens: [
		{
			id: { type: Number, required: true },
			discountValue: { type: Number, required: true },
		},
	],
	bookingRequests: [
		{
			reference_number: { type: Number, required: true },
			coupon_code: { type: Number, required: true },
			show_id: { type: Number, required: true },
			tickets: [{ type: Number, required: true }],
		},
	],
});

const User = model('User', userSchema);
module.exports = User;
