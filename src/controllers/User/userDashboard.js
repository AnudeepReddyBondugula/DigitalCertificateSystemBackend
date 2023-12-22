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
}

// Exporting the userDashboardHandler function to use it in the other parts of the application
module.exports = {userDashboardHandler};