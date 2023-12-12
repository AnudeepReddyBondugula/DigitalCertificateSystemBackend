const Organization = require("../../models/organization");
const { addMinter } = require("../../utils/blockchain-helper");
const { getRandomKeysAndAddresses } = require("../../utils/crypto-helper");

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