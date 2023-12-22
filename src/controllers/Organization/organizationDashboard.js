<<<<<<< HEAD
// Importing the organization model for database interactions
const Organization = require("../../models/organization");
=======
const Organization = require("../../models/Organization");
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456

// Creating an async function to handle requests to the organization dashboard
const organizationDashboardHandler = async (req, res) => {
<<<<<<< HEAD

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
=======
    try{
        const {username} = req.body.jwTokenData;
        const user = await Organization.findOne({username});
        const {organizationName, walletAddress} = user;
        res.status(200).json({
            details : {
                username,
                organizationName,
                walletAddress
            },
            role : "organization"
        })
    } catch(err) {
        console.error("Error in OrganizationDashboardHandler ", err);
        res.status(500).json({
            error : "Internal server error"
        });
    }
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
}

// Exporting the organizationDashboardHandler to use it in the other parts of the application
module.exports = {organizationDashboardHandler};