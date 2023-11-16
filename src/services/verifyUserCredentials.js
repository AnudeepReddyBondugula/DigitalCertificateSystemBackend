const User = require("../models/user");

const verifyUserCredentials = async (email, password) => {
	try{
      	if (!(email && password)) {
        	return null;
      	} 
        let user = await User.findOne({email, password});
		return user;
      }
	  catch(err) {
		console.log("Error in verifying User Credentials: ", err.message);
	  }
};

  module.exports = verifyUserCredentials;