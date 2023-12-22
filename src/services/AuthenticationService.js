// Importing four functions (related to Authentication) from different files
const {loginHandler} = require("../controllers/Authentication/loginHandler");
const {signupHandler} = require("../controllers/Authentication/signupHandler");
const {verifyToken} = require("../controllers/Authentication/verifyToken");
const {generateToken} = require("../controllers/Authentication/generateToken");

// Exporting all imported files as an object to use in the other parts of the application
module.exports = {loginHandler, signupHandler, verifyToken, generateToken}