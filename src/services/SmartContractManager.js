const {provider, getContractInstance, contractAddress, contractABI} = require("../config/smartContractConfig")
const hre = require("hardhat");
require("dotenv").config();


// * Getter Functions
const getUserNFTsMetaData = async (walletAddress) => {
    try{
        const contract = await getContractInstance();
        const result = await contract.getUserNFTs(walletAddress);
        // TODO : Need to query IPFS for getting the Metadata of each NFT
        return result;
    } catch (err) {
        console.error("Error in Getting User's NFTs MetaData", err.message);
        return null;
    }
}

const getUserNFTsTokenIDs = async (walletAddress) => {
    try{
        const contract = await getContractInstance();
        const result = await contract.getUserNFTtokenIDs(walletAddress);
        return result;
    } catch (err) {
        console.error("Error in Gettig User's NFT Token IDs", err.message);
        return null;
    }
}

const getNFTMetaData = async (tokenID) => {
    try{
        const contract =await getContractInstance();
        const result = await contract.tokenURI(tokenID);
        // TODO : Need to query IPFS for getting Metadata
        return result;
    } catch (err) {
        console.error("Error in Getting NFT MetaData", err.message);
        return null;
    }
}



// * State Changing Functions
const addMinter = async (minterAddress, detailsUri) => {
    try{
        const contract = await getContractInstance(process.env.OWNER_PRIVATEKEY);
        const tx = await contract.addMinter(minterAddress, detailsUri);
        await tx.wait();
        console.log(`Transaction Successful: ${tx.hash}`);
        console.log(`Minter Added Successfully : ${minterAddress}`);
        return tx.hash;
    }catch (err){
        console.log("Error in Adding Minter :", err.message);
        return null;
    }
}

const mintNFT = async (fromPrivateKey, toWalletAddress, uri) => {
    try{
        const contract = await getContractInstance(fromPrivateKey);
        const tx = await contract.safeMint(toWalletAddress, uri);
        await tx.wait();
        console.log(`Transaction Successful : ${tx.hash}`);
        console.log(`Minted NFT Successfully: Holder : ${toWalletAddress}`);
        return tx.hash;
    } catch(err){
        console.error("Error in Minting NFT: ", err.message);
        return null;
    }
}




module.exports = {
    getUserNFTsTokenIDs,
    getNFTMetaData,
    getUserNFTsMetaData, 
    addMinter, 
    mintNFT  
};