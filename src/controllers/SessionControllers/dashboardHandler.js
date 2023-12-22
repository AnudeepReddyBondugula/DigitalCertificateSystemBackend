// Importing the organizationDashboardHandler and userDashboardHandler funtions
const { organizationDashboardHandler } = require("../Organization/organizationDashboard");
const { userDashboardHandler } = require("../User/userDashboard");

// Defining an async function to handle requests to the dashboard 
const dashboardHandler = async (req, res) => {
    try{
        const {role} = req.body.jwTokenData;

        // If role is user: Calling the userDashboardHandler function
        if (role == "user") return userDashboardHandler(req, res);

        // If role is organization: Calling the organizationDashboardHandler function
        else if (role == "organization") return organizationDashboardHandler(req, res);

        // Sending a status code of 400 along with an error message
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

// Exporting the dashboardHandler to use it in the other parts of the application
module.exports = {dashboardHandler};