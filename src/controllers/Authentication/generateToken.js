// Importing the jsonwebtoken library to work with JSON Web Tokens (JWTs)
const jwt = require("jsonwebtoken");

// Function to provide a JWT based on given content and secret
const generateToken = (content, secret) => {

    // Generating a JWT using the sign function
    const jwtoken = jwt.sign(content, secret, {expiresIn : "1h"});
    return jwtoken;
}

// Exporting the generateToken function to use it in the other parts of the application
module.exports = {generateToken};