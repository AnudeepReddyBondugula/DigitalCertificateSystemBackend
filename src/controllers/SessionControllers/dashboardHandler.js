<<<<<<< HEAD
// Importing the required modules 
const User = require("../../models/user");
const Organization = require("../../models/organization");
=======
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
const { organizationDashboardHandler } = require("../Organization/organizationDashboard");
const { userDashboardHandler } = require("../User/userDashboard");

// Defining an async function to handle requests to the dashboard 
const dashboardHandler = async (req, res) => {
    try{
<<<<<<< HEAD

        // Destructuring the role from the request object
        const {role} = req.body;

        // If role is user: Calling the userDashboardHandler function
=======
        const {role} = req.body.jwTokenData;
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
        if (role == "user") return userDashboardHandler(req, res);

        // If role is organization: Calling the organizationDashboardHandler function
        else if (role == "organization") return organizationDashboardHandler(req, res);
<<<<<<< HEAD

        // If different role: Sending an error message along with a status code of 403
        else res.status(403).json({
            message : "Unauthorized! [Unknown Role]"
        })
    }catch(err){
        // Catching and handling the errors
        // Sending a status code of 500 along with an error message
=======
        else return res.status(400).json({
            error : "Unknown role"
        })
    } catch(err){
        console.error("Error in dashboardHandler", err);
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
        res.status(500).json({
            error : "Internal server error"
        });
    }
}

// Exporting the dashboardHandler to use it in the other parts of the application
module.exports = {dashboardHandler};