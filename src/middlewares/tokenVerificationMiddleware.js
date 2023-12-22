// Importing the verifyToken function from the authentication controller
const { verifyToken } = require("../controllers/Authentication/verifyToken");
const jwt = require("jsonwebtoken")
const tokenVerification = async (req, res, next) => {
    try{

        // Extracting the token from the 'Authorization' header in the request
        const token = req.headers.authorization;

        // If token not present: Throwing an error
        if (!token) {
            return res.status(401).json({
                error : "Invalid Token"
            })
        }

        // Verifying the token using verifyToken function and secret key
        const jwTokenData = await verifyToken(token, process.env.SECRET);

        // Adding token data to request body
        req.body.jwTokenData = jwTokenData;

        // Passing the control to next middleware in the stack
        next();
    }
    catch(err){

        // Catching and handling the errors
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired' });
          }
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        else return res.status(500).json({error : "Internal server error"});
    }
}

// Exporting the tokenVerification function to use it in the other parts of the application
module.exports = {tokenVerification};