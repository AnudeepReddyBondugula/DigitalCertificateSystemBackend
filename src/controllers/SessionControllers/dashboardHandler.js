const { organizationDashboardHandler } = require("../Organization/organizationDashboard");
const { userDashboardHandler } = require("../User/userDashboard");

// Defining an async function to handle requests to the dashboard 
const dashboardHandler = async (req, res) => {
    try{
        const {role} = req.body.jwTokenData;
        if (role == "user") return userDashboardHandler(req, res);

        // If role is organization: Calling the organizationDashboardHandler function
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

// Exporting the dashboardHandler to use it in the other parts of the application
module.exports = {dashboardHandler};