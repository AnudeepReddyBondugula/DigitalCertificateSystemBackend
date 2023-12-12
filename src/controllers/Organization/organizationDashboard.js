const Organization = require("../../models/organization");

const organizationDashboardHandler = async (req, res) => {
    const {username} = req.body;
    const user = await Organization.findOne({username});
    const {organizationName, walletAddress} = user;
    res.status(200).json({
        details : {

        }
        
    })
}

module.exports = {organizationDashboardHandler};