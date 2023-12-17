const { organizationDashboardHandler } = require("../Organization/organizationDashboard");
const { userDashboardHandler } = require("../User/userDashboard");

const dashboardHandler = async (req, res) => {
    try{
        const {role} = req.body.jwTokenData;
        if (role == "user") return userDashboardHandler(req, res);
        else if (role == "organization") return organizationDashboardHandler(req, res);
        else return res.status(400).json({
            error : "Unknown role"
        })
    } catch(err){
        console.error("Error in dashboardHandler", err);
        res.status(500).json({
            error : "Internal server error"
        });
    }
}

module.exports = {dashboardHandler};