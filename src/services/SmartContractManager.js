const {getContractInstance} = require("../config/smartContractConfig");
const { getData } = require("./IpfsManager");
require("dotenv").config();


// * Getter Functions
const getUserNFTsMetaData = async (walletAddress) => {
    try{
        const contract = await getContractInstance();
        const userNFTsMetaDataTokenURIs = await contract.getUserNFTs(walletAddress);
        const userNFTsMetaData =await Promise.all(
            userNFTsMetaDataTokenURIs.map(async (tokenURI) => {
                return JSON.parse(await getData(tokenURI));
            })
        ) 

        return userNFTsMetaData;
    } catch (err) {
        console.error("Error in Getting User's NFTs MetaData", err.message);
        return null;
    }
}

const getUserNFTsTokenIDs = async (walletAddress) => {
    try{
        const contract = await getContractInstance();
        const userNFTsTokenIDs = await contract.getUserNFTtokenIDs(walletAddress);
        const uint256ToStringArray = userNFTsTokenIDs.map(tokenID => {
            return tokenID.toString();
        });
        return uint256ToStringArray;
    } catch (err) {
        console.error("Error in Gettig User's NFT Token IDs", err.message);
        return null;
    }
}

const getNFTMetaData = async (tokenID) => {
    try{
        const contract =await getContractInstance();
        const nftMetaDataCID = await contract.tokenURI(tokenID);
        const nftMetaData = JSON.parse(await getData(nftMetaDataCID));
        return nftMetaData;
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