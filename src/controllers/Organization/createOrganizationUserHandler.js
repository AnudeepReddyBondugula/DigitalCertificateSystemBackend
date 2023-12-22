const Organization = require("../../models/organization");
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

        // Generating cryptographic keys and addresses
        const {privateKey, publicKey, walletAddress} = getRandomKeysAndAddresses();

        // Creating a new user instance 
        let user = await Organization({
            username,
            password,
            fullName,
            organizationName,
            privateKey,
            publicKey,
            walletAddress
        })

        // Adding user to the database
        await user.save();

        // Creating the detailsURI and adding the user as a minter in the smart contract
        const detailsURI = `Minter : ${username}`; // TODO: Need to make a JSON and upload in IPFS
        await addMinter(walletAddress, detailsURI);
        return res.status(201).json({
            message : "Signup success"
        })
    } catch(err){
        await Organization.deleteOne({username}); // Deleting the User from the database
        return res.status(500).json({
            error : "Internal server error"
        })
    }
}

module.exports = {createOrganizationUserHandler};
