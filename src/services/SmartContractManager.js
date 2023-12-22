// Importing the required functions
const {getContractInstance} = require("../config/smartContractConfig");
const { getData } = require("./IpfsManager");

// Importing dotenv to load environment variables
require("dotenv").config();


// * Getter Functions
// Defining an async function to get metadata of NFTs owned by an user
const getUserNFTsMetaData = async (walletAddress) => {
    try{

        // Creating a smart contarct instance
        const contract = await getContractInstance();

        // Getting token URIs associated with user's NFTs
        const userNFTsMetaDataTokenURIs = await contract.getUserNFTs(walletAddress);

        // Getting metadata for each token URI
        const userNFTsMetaData =await Promise.all(
            userNFTsMetaDataTokenURIs.map(async (tokenURI) => {
                return JSON.parse(await getData(tokenURI));
            })
        ) 

        return userNFTsMetaData;
    } catch (err) {

        // Catching and handling the errors
        console.error("Error in Getting User's NFTs MetaData", err.message);
        return null;
    }
}


// Defining an async function to get token IDs of NFTs owned by a user
const getUserNFTsTokenIDs = async (walletAddress) => {
    try{

        // Creating an instance of smart contarct
        const contract = await getContractInstance();

        // Getting token IDs associated with user's NFTs
        const userNFTsTokenIDs = await contract.getUserNFTtokenIDs(walletAddress);

        // Type casting the token IDs
        const uint256ToStringArray = userNFTsTokenIDs.map(tokenID => {
            return tokenID.toString();
        });
        return uint256ToStringArray;
    } catch (err) {

        // Catching and handling the errors
        console.error("Error in Gettig User's NFT Token IDs", err.message);
        return null;
    }
}

// Defining an async function to get metadata of a specific NFT by token ID
const getNFTMetaData = async (tokenID) => {
    try{

        // Creating an instance of a smart contract 
        const contract =await getContractInstance();

        // Getting the URI of the NFTs metadata
        const nftMetaDataCID = await contract.tokenURI(tokenID);

        // Retrieving the metadata for NFT using IPFS
        const nftMetaData = JSON.parse(await getData(nftMetaDataCID));
        return nftMetaData;
    } catch (err) {

        // Catching and handling the errors
        console.error("Error in Getting NFT MetaData", err.message);
        return null;
    }
}



// * State Changing Functions

// Defining an async function to add a minter to the smart contract
const addMinter = async (minterAddress, detailsUri) => {
    try{

        //Getting an instance of smart contract with owner's private key
        const contract = await getContractInstance(process.env.OWNER_PRIVATEKEY);

        // Adding a minter to the contract
        const tx = await contract.addMinter(minterAddress, detailsUri);
        await tx.wait();

        // Logging success information to console
        console.log(`Transaction Successful: ${tx.hash}`);
        console.log(`Minter Added Successfully : ${minterAddress}`);
        return tx.hash;
    }catch (err){
        console.log("Error in Adding Minter :", err.message);
        return null;
    }
}

// Defining an async function to mint an NFT and transfer it to a specified wallet address
const mintNFT = async (fromPrivateKey, toWalletAddress, uri) => {
    try{

        // Creating an instance of the smart contract with the sender's private key
        const contract = await getContractInstance(fromPrivateKey);

        // Minting an NFT an transferring it to the specified wallet address
        const tx = await contract.safeMint(toWalletAddress, uri);
        await tx.wait();

        // Logging success information to the console
        console.log(`Transaction Successful : ${tx.hash}`);
        console.log(`Minted NFT Successfully: Holder : ${toWalletAddress}`);
        return tx.hash;
    } catch(err){
        console.error("Error in Minting NFT: ", err.message);
        return null;
    }
}


// Exporting functions as an object to use in the other parts of the application
module.exports = {
    getUserNFTsTokenIDs,
    getNFTMetaData,
    getUserNFTsMetaData, 
    addMinter, 
    mintNFT  
};