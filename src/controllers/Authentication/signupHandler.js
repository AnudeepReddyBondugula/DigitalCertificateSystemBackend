<<<<<<< HEAD
// Importing the required functions from the respective modules
const { getUser } = require("../../utils/helpers");
const {createUser} = require("../User/createUser");
const {createOrganizationUser} = require("../Organization/createOrganizationUser");
=======
const { getUser } = require("../../utils/helper");
const {createUserHandler} = require("../User/createUserHandler");
const {createOrganizationUserHandler} = require("../Organization/createOrganizationUserHandler");
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456

// Defining an async function to handle user signup
const signupHandler = async (req, res) => {
    try{
        // Destructuring username and role from request body
        const {username, role} = req.body;

        // Checking if required fields are empty
        if (!(username && role)){
<<<<<<< HEAD

            // Throwing an error with a 403 status code and a message
            throw Error(JSON.stringify({
                status : 403,
                message : "Required Fields Are Empty"
            }));
=======
            return res.status(400).json({
                error : "Required fields are empty"
            })
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
        }

        const user = await getUser({username}); // Checking if a user Exists aldready
        if (user){
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
<<<<<<< HEAD

        // Sending a success message with a status code of 201 (Created)
        res.status(201).json({
            message : "User Added Successfully!"
        })
        
    } catch(err) {
        // Catching and handling the errors
        const {status, message} = JSON.parse(err.message);
        console.error("Error: " + message);

        // Sending an error message with the extracted status
        res.status(status).json({
            message
=======
    } catch(err) {
        console.error("Error in SignUp: " + err);
        res.status(500).json({
            error : "Internal server error"
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
        })
    }
}


// Exporting the signupHandler function to use it in the other parts of the application
module.exports = {signupHandler}