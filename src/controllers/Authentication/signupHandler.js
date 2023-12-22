// Importing the required functions
const { getUser } = require("../../utils/helper");
const {createUserHandler} = require("../User/createUserHandler");
const {createOrganizationUserHandler} = require("../Organization/createOrganizationUserHandler");

// Defining an async function to handle user signup
const signupHandler = async (req, res) => {
    try{
        // Destructuring username and role from request body
        const {username, role} = req.body;

        // Checking if required fields are empty
        if (!(username && role)){
            return res.status(400).json({
                error : "Required fields are empty"
            })
        }

        const user = await getUser({username}); // Checking if a user Exists aldready
        if (user){

            // Sending a status code of 409 along with an error
            return res.status(409).json({
                error : "Username already exists"
            });
        }

        // Handling user creation based on the role provided
        if (role === "user"){
            return createUserHandler(req, res);
        }
        else if (role === "organization"){
            return createOrganizationUserHandler(req, res);
        }
        else{
            return res.status(400).json({
                error : "Unknown Role"
            })
        }
    } catch(err) {
        console.error("Error in SignUp: " + err);

        // Sending a status code of 500 along with an error
        res.status(500).json({
            error : "Internal server error"
        })
    }
}


// Exporting the signupHandler function to use it in the other parts of the application
module.exports = {signupHandler}