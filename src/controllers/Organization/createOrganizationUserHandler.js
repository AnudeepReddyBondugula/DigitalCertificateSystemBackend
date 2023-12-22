const Organization = require("../../models/organization");
const { addMinter } = require("../../services/SmartContractManager");
const { getRandomKeysAndAddresses } = require("../../utils/crypto-helper");

// Defining an async function to handle the creation of organization user
const createOrganizationUserHandler = async (req, res) => {

    // Destructuring the user details from the request body
    const {username, password, fullName, organizationName} = req.body;

    // Checking whether all the details are provided or not
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

        // Sending a status code of 201 along with an error message
        return res.status(201).json({
            message : "Signup success"
        })
    } catch(err){
        await Organization.deleteOne({username}); // Deleting the User from the database

        // Sending a status code of 500 along with an error message
        return res.status(500).json({
            error : "Internal server error"
        })
    }
}

// Exporting the createOrganizationUserHandler function to use it in the other parts of the application
module.exports = {createOrganizationUserHandler};
