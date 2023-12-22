// Importing the user schema
const User = require("../../models/User");


// Defining an async function to handle requests to user dashboard
const userDashboardHandler = async (req, res) => {

    // Extracting the user details from request body
    const {username} = req.body.jwTokenData;
    const user = await User.findOne({username});
    const {walletAddress} = user;

    // Sending the user details along with a status code
    res.status(200).json({
        details : {
            username,
            walletAddress
        },
        role : "user"
    })
}

// Exporting the userDashboardHandler function to use it in the other parts of the application
module.exports = {userDashboardHandler};