// Importing the required functions from the respective modules
const { getUser } = require("../../utils/helpers");
const {generateToken} = require("./generateToken");

// Loading environment variables from a .env file
require("dotenv").config();

// Defining an async function to handle user login
async function loginHandler(req, res) {
    try{

        // Destructuring username and password from request body
        const {username, password} = req.body;

        // Checking if password or username is missing
        if (!username || !password){
            console.log("[FAILED] Username or Password is empty!");
            // Sending a 403 (Forbidden) response with "Unauthorized" message
            return res.status(403).json({
                message : "Unauthorized!"
            });
        }

        // Retrieving user information based on provided details
        const user = await getUser({username, password});

        // If user is not found (Invalid credentials)
        if (!user){
            console.log("[FAILED] Invalid Username or Password!");
            return res.status(403).json({
                message : "Unauthorized!"
            });
        }

        // Retrieving user role and generating a JWT
        const role = user.role;
        const jwtoken = generateToken({username, role}, process.env.SECRET)

        // Sending a 200 (OK) response along with the generated JWT and user role
        res.status(200).json({
            jwtoken,
            role
        })

        // Logging a success message
        console.log("[SUCCESS] Login Successfull !")
    }
    catch (err) {
        // Catching and handling errors that occured during login process
        console.log("[FAILED] Error in Login : " + err);

        // Sending a 500 (Internal Server Error) response with an error message
        return res.status(500).json({
            message : "Interval Server Error!"
        })
    }
}

// Exporting the loginHandler function to use it in the other parts of the application.
module.exports = {loginHandler};