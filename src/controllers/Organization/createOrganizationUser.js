const Organization = require("../../models/organization");
const { addMinter } = require("../../services/SmartContractManager");
const { getRandomKeysAndAddresses } = require("../../utils/crypto-helper");

const createOrganizationUser = async (body) => {
    const {username, password, fullName, organizationName} = body;
    if (!(username && password && fullName && organizationName)){
        throw Error(JSON.stringify({
            status : 403,
            message : "Required Fields Are Empty!"
        }));
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
        throw Error(JSON.stringify({
            status : 500,
            message : "Internal Server Error"
        }))
    }
       
    
    return true;
}

module.exports = {createOrganizationUser};