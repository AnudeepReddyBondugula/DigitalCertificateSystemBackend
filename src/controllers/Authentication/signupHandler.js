const { getRandomKeysAndAddresses } = require("../../utils/crypto-helper");
const { getUser } = require("../../utils/helpers");
const User = require("../../models/user");
const Organization = require("../../models/organization");
const { addMinter } = require("../../utils/blockchain-helper");

const signupHandler = async (req, res) => {
    try{
        const {username, role} = req.body;
        const user = await getUser({username}); //* Checking if any user Exists aldready
        if (user){
            console.log("[FAILED] User Aldready Exists!");
            return res.status(403).json({
                message : "Unauthorized!"
            });
        }
        if (role === "user"){
            await createUser(req, res);
        }
        else if (role === "organization"){
            await createOrganizationUser(req, res);
        }
        else{
            res.status(403).json({
                message : "Unauthorized! [Unknown role]"
            })
        }
    } catch(err) {
        console.error("Error: " + err.message);
        res.status(500).json({
            message : "Internal Server Error!"
        })
    }
}

const createOrganizationUser = async (req, res) => {
    const {username, password, fullName, organizationName} = req.body;
    const {privateKey, publicKey, walletAddress} = getRandomKeysAndAddresses();
    let user = await Organization({
        username,
        password,
        fullName,
        organizationName,
        privateKey,
        publicKey,
        walletAddress
    })
    await addMinter(walletAddress, "Minter 1"); // TODO Details Need to be added
    await user.save();
    
    res.status(201).json({
        message : "User Added Successfully!"
    })
}

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

module.exports = {signupHandler}