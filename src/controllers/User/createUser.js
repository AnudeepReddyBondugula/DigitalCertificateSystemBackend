const User = require("../../models/user");
const { getRandomKeysAndAddresses } = require("../../utils/crypto-helper");


const createUser = async (req, res) => {
    const {username, password, fullName, aadharNumber} = req.body;
    let user = await User.findOne({aadharNumber}); // * Checking if the User aadharcard is aldready registered
    if (user){
        console.log("[FAILED] User Aldready Exists!");
        return res.status(403).json({
            message : "Unauthorized!"
        });
    }
    const {privateKey, publicKey, walletAddress} = getRandomKeysAndAddresses();
    user = await User({
        username,
        password,
        fullName,
        aadharNumber,
        privateKey,
        publicKey,
        walletAddress
    })

    await user.save();
    res.status(201).json({
        message : "User Added Successfully!"
    })
}

module.exports = {createUser};