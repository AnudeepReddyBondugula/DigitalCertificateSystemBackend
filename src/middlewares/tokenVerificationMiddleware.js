// Importing the verifyToken function from the authentication controller
const { verifyToken } = require("../controllers/Authentication/verifyToken");

// Defining an async middleware function for token verification
const tokenVerification = async (req, res, next) => {
    try{

        // Extracting the token from the 'Authorization' header in the request
        const token = req.headers.authorization;

        // If token not present: Throwing an error
        if (!token) {
            throw Error("Invalid Token");
        }

        // Verifying the token using the verifyToken function with the provided secret key
        const content = await verifyToken(token, process.env.SECRET);

        // Adding information extracted from token to the request body
        req.body.username = content.username;
        req.body.role = content.role;

        // Passing the control to the next middleware function in the stack
        next();
    }
    catch(err){

        // If invalid token: Responding a status code of 403 (Forbidden Status) and an error message
        if (err.message === 'Invalid Token'){
            return res.status(403).json({message : "Unauthorized"});
        }

        // If other error: Responding with a status code of 500 and an error message
        else return res.status(500).json({message : "Internal Server Error"});
    }
}

// Exporting the tokenVerification function to use it in the other parts of the application
module.exports = {tokenVerification};