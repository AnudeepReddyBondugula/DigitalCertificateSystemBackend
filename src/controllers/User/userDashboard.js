<<<<<<< HEAD
// Creating an async function to handle requests to the user dashboard
const userDashboardHandler = async () => {
    // Yet to be completed!!!
=======
const User = require("../../models/User");

const userDashboardHandler = async (req, res) => {
    const {username} = req.body.jwTokenData;
    const user = await User.findOne({username});
    const {walletAddress} = user;
    res.status(200).json({
        details : {
            username,
            walletAddress
        },
        role : "user"
    })
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
}

// Exporting the userDashboardHandler function to use it in the other parts of the application
module.exports = {userDashboardHandler};