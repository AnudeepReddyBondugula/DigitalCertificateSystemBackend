const Organization = require("../models/Organization");

const verifyOrganizationCredentials = async (email, password) => {
	try{
      	if (!(email && password)) {
        	return null;
      	} 
        let organization = await Organization.findOne({email, password});
		return organization;
      }
	  catch(err) {
		console.log("Error in verifying Organization Credentials: ", err.message);
	  }
};

  module.exports = verifyOrganizationCredentials;