const User = require("../../models/user");
const { getRandomKeysAndAddresses } = require("../../utils/crypto-helper");


const createUser = async (body) => {
    const {username, password, fullName, aadharNumber} = body;
    if (!(username && password && fullName && aadharNumber)){
        throw Error(JSON.stringify({
            status : 403,
            message : "Required Fields Are Empty!"
        }));
    }
    
    let user;

    try{
        user = await User.findOne({aadharNumber}); // * Checking if the User aadharcard is aldready registered
    }catch(err){
        throw Error(JSON.stringify({
            status : 500,
            message : "Internal Server Error"
        }))
    }
    if (user){
        console.log("[FAILED] User Aldready Exists!");
        throw Error(JSON.stringify({
            status : 403,
            message : "User Already Exists"
        }))
    }
    try{
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
    }catch(err){
        throw Error(JSON.stringify({
            status : 500,
            message : "Internal Server Error"
        }))
    }
    return true;
}

module.exports = {createUser};