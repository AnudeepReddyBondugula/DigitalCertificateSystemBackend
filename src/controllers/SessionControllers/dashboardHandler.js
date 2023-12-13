const User = require("../../models/user");
const Organization = require("../../models/organization");
const { organizationDashboardHandler } = require("../Organization/organizationDashboard");
const { userDashboardHandler } = require("../User/userDashboard");

const dashboardHandler = async (req, res) => {
    try{
        const {role} = req.body;
        if (role == "user") return userDashboardHandler(req, res);
        else if (role == "organization") return organizationDashboardHandler(req, res);
        else res.status(403).json({
            message : "Unauthorized! [Unknown Role]"
        })
    }catch(err){
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
}

module.exports = {dashboardHandler};