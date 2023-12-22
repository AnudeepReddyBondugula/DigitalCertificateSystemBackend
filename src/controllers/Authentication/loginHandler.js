// Importing the getUser and generateToken functions 
const { getUser } = require("../../utils/helper");
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
            return res.status(400).json({
                error : "Required fields are empty"
            });
        }

        // Retrieving user information based on given details
        const user = await getUser({username, password});

        // If user is not found (Invalid credentials)
        if (!user){
            console.log("FAILED : User not found");

            // Sending a 404 status code along with an error message
            return res.status(404).json({
                error : "User not found"
            });
        }

        // Retrieving user role and generating a JWT
        const role = user.role;
        const jwtoken = generateToken({username, role}, process.env.SECRET)

        // Sending a 200 (OK) response along with the generated JWT and user role
        res.status(200).json({
            message : "Login success",
            jwtoken,
            role
        })

        // Logging a success message to console
        console.log("[SUCCESS] Login Successfull !")
    }
    catch (err) {
        console.log("FAILED: Error in Login : " + err);

        // Sending a status code of 500 along with an error message
        return res.status(500).json({
            error : "Interval server error!"
        })
    }
}

// Exporting the loginHandler function to use it in the other parts of the application.
module.exports = {loginHandler};