// Importing the required modules
const Organization = require("../../models/organization");
const { addMinter } = require("../../services/SmartContractManager");
const { getRandomKeysAndAddresses } = require("../../utils/crypto-helper");

// Creating a new organization user
const createOrganizationUser = async (body) => {
    // Destructuring the user details from the body object
    const {username, password, fullName, organizationName} = body;
    
    // Input validation: Checking if all required fields are present
    if (!(username && password && fullName && organizationName)){

        // Throwing an error if any required field is missing
        throw Error(JSON.stringify({
            status : 403,
            message : "Required Fields Are Empty!"
        }));
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

    } catch(err){
        await Organization.deleteOne({username}); // Deleting the User from the database
        throw Error(JSON.stringify({
            status : 500,
            message : "Internal Server Error"
        }))
    }
       
    // Returning true if user creation process is successful
    return true;
}

// Exporting the createOrganizationUser function to use it in the other parts of the application
module.exports = {createOrganizationUser};