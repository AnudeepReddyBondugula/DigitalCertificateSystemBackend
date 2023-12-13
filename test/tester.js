const {ethers} = require("hardhat");
const { 
    getNFTMetaData,
    getUserNFTsMetaData, 
    addMinter, 
    mintNFT,
    getUserNFTsTokenIDs
} = require("../src/services/SmartContractManager");


async function main () {
    // const res = await addMinter("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "Account #1");


    // const res = await mintNFT("59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d", "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", "1ST NFT FOR TESTING BLAH BLAH BLAH");
    // const res = await mintNFT("59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d", "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", "2ND NFT FOR TESTING BLAH BLAH BLAH");

    // const res = await getUserNFTsMetaData("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");
    
    
    // const res = await getNFTMetaData(0);
    
    
    const res = await getUserNFTsTokenIDs("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");
    
    
    console.log(`Result: ${res}`);
}

main();