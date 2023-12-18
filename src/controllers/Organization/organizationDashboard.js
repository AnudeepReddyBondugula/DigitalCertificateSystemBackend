const Organization = require("../../models/Organization");

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

module.exports = {organizationDashboardHandler};