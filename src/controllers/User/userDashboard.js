const User = require("../../models/user");

const userDashboardHandler = async (req, res) => {
    const {username} = req.body.jwTokenData;
    const user = await User.findOne({username});
    const {walletAddress} = user;
    res.status(200).json({
        details : {
            username,
            walletAddress
        }
    })
}

module.exports = {userDashboardHandler};