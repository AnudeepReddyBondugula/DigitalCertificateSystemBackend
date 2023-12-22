// Importing the required functions from the respective modules
const { getUser } = require("../../utils/helpers");
const {createUser} = require("../User/createUser");
const {createOrganizationUser} = require("../Organization/createOrganizationUser");

// Defining an async function to handle user signup
const signupHandler = async (req, res) => {
    try{
        // Destructuring username and role from request body
        const {username, role} = req.body;

        // Checking if required fields are empty
        if (!(username && role)){

            // Throwing an error with a 403 status code and a message
            throw Error(JSON.stringify({
                status : 403,
                message : "Required Fields Are Empty"
            }));
        }

        const user = await getUser({username}); // Checking if a user Exists aldready
        if (user){
            console.log("[FAILED] User Already Exists!");
            throw Error(JSON.stringify({
                status : 403,
                message : "User Aldready Exists!"
            }));
        }

        // Handling user creation based on the role provided
        if (role === "user"){
            await createUser(req.body);
        }
        else if (role === "organization"){
            await createOrganizationUser(req.body);
        }
        else{
            throw Error(JSON.stringify({
                status : 403,
                message : "Unknown Role"
            }));
        }

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
        })
    }
}


// Exporting the signupHandler function to use it in the other parts of the application
module.exports = {signupHandler}