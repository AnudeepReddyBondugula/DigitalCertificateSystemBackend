// Importing the required modules 
const User = require("../../models/user");
const Organization = require("../../models/organization");
const { organizationDashboardHandler } = require("../Organization/organizationDashboard");
const { userDashboardHandler } = require("../User/userDashboard");

// Defining an async function to handle requests to the dashboard 
const dashboardHandler = async (req, res) => {
    try{

        // Destructuring the role from the request object
        const {role} = req.body;

        // If role is user: Calling the userDashboardHandler function
        if (role == "user") return userDashboardHandler(req, res);

        // If role is organization: Calling the organizationDashboardHandler function
        else if (role == "organization") return organizationDashboardHandler(req, res);

        // If different role: Sending an error message along with a status code of 403
        else res.status(403).json({
            message : "Unauthorized! [Unknown Role]"
        })
    }catch(err){
        // Catching and handling the errors
        // Sending a status code of 500 along with an error message
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
}

// Exporting the dashboardHandler to use it in the other parts of the application
module.exports = {dashboardHandler};