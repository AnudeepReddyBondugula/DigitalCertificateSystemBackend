<<<<<<< HEAD
// Importing the required functions from the respective modules
const { getUser } = require("../../utils/helpers");
=======
const { getUser } = require("../../utils/helper");
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
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
<<<<<<< HEAD
            // Sending a 403 (Forbidden) response with "Unauthorized" message
            return res.status(403).json({
                message : "Unauthorized!"
=======
            return res.status(400).json({
                error : "Required fields are empty"
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
            });
        }

        // Retrieving user information based on provided details
        const user = await getUser({username, password});

        // If user is not found (Invalid credentials)
        if (!user){
            console.log("FAILED : User not found");
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
<<<<<<< HEAD

        // Logging a success message
        console.log("[SUCCESS] Login Successfull !")
    }
    catch (err) {
        // Catching and handling errors that occured during login process
        console.log("[FAILED] Error in Login : " + err);

        // Sending a 500 (Internal Server Error) response with an error message
=======
        console.log("SUCCESS: Login Successfull !")
    }
    catch (err) {
        console.log("FAILED: Error in Login : " + err);
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
        return res.status(500).json({
            error : "Interval server error!"
        })
    }
}

// Exporting the loginHandler function to use it in the other parts of the application.
module.exports = {loginHandler};