// Importing the Organization schema
const Organization = require("../../models/organization");

// Creating an async function to handle requests to the organization dashboard
const organizationDashboardHandler = async (req, res) => {
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
}

// Exporting the organizationDashboardHandler to use it in the other parts of the application
module.exports = {organizationDashboardHandler};