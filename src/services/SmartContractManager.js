const {provider, getContractInstance} = require("../config/smartContractConfig")

const getUserNFTsMetaData = async (walletAddress) => {
    const contract = getContractInstance();
    const result = await contract.getUserNFTs(walletAddress);
    return result;
}

const addMinter = async (walletAddress, detailsUri) => {
    const contract = getContractInstance();
    const result = await contract.addMinter(walletAddress);
    return result;
}

const mintNFT = async (fromPrivateKey, toWalletAddress, uri) => {
    const contract = getContractInstance(fromPrivateKey);
    await contract.safeMint(toWalletAddress, uri);
}

getUserNFTsMetaData("0x5fbdb2315678afecb367f032d93f642f64180aa3")
mintNFT("6745348248a0b2e6329cbe99bb0b02547dc6a871301a9acc93dae05c1bee396a", "0x5fbdb2315678afecb367f032d93f642f64180aa3", "1st NFT testing");

module.exports = { addMinter, mintNFT, getUserNFTsMetaData };