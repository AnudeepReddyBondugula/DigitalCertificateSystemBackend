const jwt = require("jsonwebtoken");

const verifyToken = async (token, secret) => {
	
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, decoded) => {
			if (err){
				reject(new Error("Invalid Token"));
			}
			else resolve(decoded);
		});
	});
};

  module.exports = {verifyToken};