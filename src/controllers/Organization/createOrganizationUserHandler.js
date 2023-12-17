const Organization = require("../../models/Organization");
const { addMinter } = require("../../services/SmartContractManager");
const { getRandomKeysAndAddresses } = require("../../utils/crypto-helper");

const createOrganizationUserHandler = async (req, res) => {
    const {username, password, fullName, organizationName} = req.body;
    if (!(username && password && fullName && organizationName)){
        return res.status(400).json({
            error : "Required fields are empty"
        })
    }
    try{
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
        await user.save();
        const detailsURI = `Minter : ${username}`; // TODO: Need to make a JSON and upload in IPFS
        await addMinter(walletAddress, detailsURI);
    } catch(err){
        await Organization.deleteOne({username}); // Deleting the User from the database
        return res.status(500).json({
            error : "Internal server error"
        })
    }
}

module.exports = {createOrganizationUserHandler};