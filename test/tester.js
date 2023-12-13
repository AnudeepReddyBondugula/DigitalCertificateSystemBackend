const {ethers} = require("hardhat");
const { 
    getNFTMetaData,
    getUserNFTsMetaData, 
    addMinter, 
    mintNFT  
} = require("../src/services/SmartContractManager");


async function main () {
    const res = await addMinter("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "Account #1");
    console.log(`Result: ${res}`);
}

main();