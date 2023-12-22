// Importing the jsonwebtoken library for working with JSON Web Tokens
const jwt = require("jsonwebtoken");

// Creating an async function to verify a JSON web token
const verifyToken = async (token, secret) => {
	
	// Returning a new promise to encapsulate asynchronous verification process
	return new Promise((resolve, reject) => {

		// verifying the token
		jwt.verify(token, secret, (err, decoded) => {
			// Callback function will handle the result of the verification

			// If error, reject the promise with an "Invalid Token" error
			if (err){
				reject(err);
			}

			// If success, resolve promise with the decoded payload of the token
			else resolve(decoded);
		});
	});
};

// Exporting the verifyToken function to use it in the other parts of the application
module.exports = {verifyToken};