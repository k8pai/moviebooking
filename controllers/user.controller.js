/**
 * Retrieves the count of users from the database.
 * @returns {Promise<number>} The count of users.
 */
const userCount = async () => {
	const data = await User.find().count();
	return data;
};

/**
 * Finds a user in the database based on the provided query.
 * @param {Object} query - The query object to search for a user.
 * @returns {Promise<Object>} The user object.
 */
const findUser = async (query) => {
	const data = await User.find(query);
	return data[0];
};

/**
 * Updates a user in the database based on the provided query and data.
 * @param {Object} query - The query object to find the user to update.
 * @param {Object} data - The data object containing the updated user information.
 * @returns {Promise<Object>} The response object.
 */
const updateUser = async (query, data) => {
	const response = await User.updateOne(query, data);
	return response;
};

/**
 * Checks if a user exists in the database based on the provided username and password.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The user object.
 */
const checkUser = async (username, password) => {
	const response = await User.find({
		username: username,
		password: password,
	});
	return response[0];
};

/**
 * Registers a new user in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
exports.signUp = async (req, res) => {
	const { email_address, first_name, last_name, mobile_number, password } =
		req.body;
	try {
		const count = await userCount();

		const isRegisteredEmail = await User.find({ email: email_address })[0];

		if (isRegisteredEmail) {
			return res
				.status(400)
				.send('Email is already registered. Try another email!');
		}

		const isRegisteredNumber = await User.find({
			contact: mobile_number,
		})[0];

		if (isRegisteredNumber) {
			return res
				.status(400)
				.send('Mobile number is already registered. Try logging in.');
		}

		const data = {
			userid: count + 1,
			email: email_address,
			first_name,
			last_name,
			username: first_name + last_name,
			contact: mobile_number,
			password,
			role: 'user',
			isLoggedIn: false,
			uuid: '',
			accesstoken: '',
		};
		const response = await User.create(data);
		return res.status(200).send('Registered successfully!');
	} catch (err) {
		return res.status(500).send(`Internal server error`);
	}
};

/**
 * Logs in a user and generates an access token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
exports.login = async (req, res) => {
	const { authorization } = req.headers;
	try {
		const encoded = authorization.split(' ').pop();
		const [username, password] = atob(encoded).split(':');

		const isRegisteredUsername = await User.findOne({ username: username });

		if (!isRegisteredUsername) {
			return res.status(200).send(`No such username found. Try again.`);
		}

		const data = await checkUser(username, password);
		if (!data) {
			return res.status(404).send('Wrong password, try again.');
		}

		data.uuid = uuid();
		data.accesstoken = new tokenGenerator(
			256,
			tokenGenerator.BASE62,
		).generate();
		data.isLoggedIn = true;
		const result = await updateUser({ userid: data.userid }, data);
		res.status(200).json({
			id: data.uuid,
			'access-token': data.accesstoken,
		});
	} catch (err) {
		return res.status(500).send('Internal server error!');
	}
};

/**
 * Logs out a user by resetting their UUID, access token, and login status.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
exports.logout = async (req, res) => {
	const { uuid } = req.body;
	try {
		const data = await findUser({ uuid: uuid });
		if (!data) {
			return res.status(400).send('No user logged in');
		}
		data.uuid = '';
		data.accesstoken = '';
		data.isLoggedIn = false;
		const response = await updateUser({ userid: data.userid }, data);
		if (!response.acknowledged) {
			return res.status(400).json({ message: 'Something went wrong' });
		}

		res.status(200).json({ message: 'Logged Out successfully.' });
	} catch (err) {
		return res.status(500).send('Internal server error');
	}
};

/**
 * Retrieves a coupon code for a user based on the provided code and access token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
exports.getCouponCode = async (req, res) => {
	const { code } = req.query;
	const { authorization } = req.headers;
	try {
		const token = authorization.split(' ').pop();
		const data = await findUser({ accesstoken: token });
		if (!data) {
			res.status(400).json({ message: 'No such coupon code found.' });
		}
		const obj = data.coupens.length
			? data.coupens.find((el) => el.id === code)
			: {};

		res.status(200).json(obj);
	} catch (error) {
		return res.status(500).send('Internal server error');
	}
};

/**
 * Books a show for a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
exports.bookShow = async (req, res) => {
	const { authorization } = req.headers;
	const { customerUuid, bookingRequest } = req.body;
	try {
		const token = authorization.split(' ').pop();
		const uuid = customerUuid;
		const customer = await findUser({ uuid: uuid });
		bookingRequest.reference_number = 12345;
		customer.bookingRequests.push(bookingRequest);
		const response = await updateUser({ uuid: uuid }, customer);
		res.status(200).json(bookingRequest);
	} catch (error) {
		res.status(500).send('Internal server error');
	}
};
