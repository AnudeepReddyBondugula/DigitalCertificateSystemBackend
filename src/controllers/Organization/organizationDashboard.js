// Importing the organization model for database interactions
const Organization = require("../../models/organization");

// Creating an async function to handle requests to the organization dashboard
const organizationDashboardHandler = async (req, res) => {

    // Destructuring the username from request object
    const {username} = req.body;

    // Fetching the user from the database based on the username
    const user = await Organization.findOne({username});

    // Destructuring the relevant information from user object
    const {organizationName, walletAddress} = user;

    // Sending the details to be present on the user dashboard along with a status code of 200
    res.status(200).json({
        details : {
            // Yet to be completed!!!
        }
        
    })
}

// Exporting the organizationDashboardHandler to use it in the other parts of the application
module.exports = {organizationDashboardHandler};