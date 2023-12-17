const User = require("../../models/User");
const { getRandomKeysAndAddresses } = require("../../utils/crypto-helper");

const createUserHandler = async (req, res) => {
    const {username, password, fullName, aadharNumber} = req.body;
    if (!(username && password && fullName && aadharNumber)){
        return res.status(400).json({
            error : "Required fields are empty"
        })
    }
    
    let user = await User.findOne({aadharNumber}); // * Checking if the User aadharcard is aldready registered
    
    if (user){
        return res.status(409).json({
            error : "User already exists"
        })
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
}

module.exports = {createUserHandler};