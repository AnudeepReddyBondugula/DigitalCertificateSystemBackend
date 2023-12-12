const {loginHandler} = require("../controllers/Authentication/loginHandler");
const {signupHandler} = require("../controllers/Authentication/signupHandler");
const {verifyToken} = require("../controllers/Authentication/verifyToken");
const {generateToken} = require("../controllers/Authentication/generateToken");


module.exports = {loginHandler, signupHandler, verifyToken, generateToken}