const hre = require("hardhat");
require("dotenv").config();


export const addMinter = async (_publicAddress, _detailsURI) => {
    const smartContractAddress = process.env.SMARTCONTRACT_ADDRESS;
    // TODO: add the Minter to the contract
}