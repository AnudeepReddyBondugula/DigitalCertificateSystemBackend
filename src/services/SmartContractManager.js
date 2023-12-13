const {provider, getContractInstance} = require("../config/smartContractConfig")


// * Getter Functions
const getUserNFTsMetaData = async (walletAddress) => {
    try{
        const contract = getContractInstance();
        const result = await contract.getUserNFTs(walletAddress);
        // TODO : Need to query IPFS for getting the Metadata of each NFT
        return result;
    } catch (err) {
        console.error("Error in Getting User's NFTs MetaData");
        return null;
    }
}

const getNFTMetaData = async (tokenID) => {
    try{
        const contract = getContractInstance();
        const result = await contract.tokenURI(tokenID);
        // TODO : Need to query IPFS for getting Metadata
        return result;
    } catch (err) {
        console.error("Error in Getting NFT MetaData");
        return null;
    }
}



// * State Changing Functions
const addMinter = async (minterAddress, detailsUri) => {
    try{
        const contract = getContractInstance(process.env.OWNER_PRIVATEKEY);
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
        const contract = getContractInstance(fromPrivateKey);
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
    getNFTMetaData,
    getUserNFTsMetaData, 
    addMinter, 
    mintNFT  
};