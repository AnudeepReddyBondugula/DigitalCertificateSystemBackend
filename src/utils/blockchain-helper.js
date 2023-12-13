// * USE THIS FILE TO INTERACT WITH THE SMART CONTRACT

const hre = require("hardhat");
const {provider, contractAddress, contractAbi} = require("../config/smartContractConfig");
require("dotenv").config();

const addMinter = async (_minterAddress, _detailsURI) => {
    const provider = new hre.ethers.JsonRpcProvider('http://127.0.0.1:8545');
    const smartContractAddress = process.env.CONTRACT_ADDRESS;
    const signer = await provider.getSigner();
    const contract = new hre.ethers.Contract(smartContractAddress, contractAbi, signer);
    try{
        const tx = await contract.addMinter(_minterAddress, _detailsURI);
        await tx.wait();
        console.log('Transaction hash:', tx.hash);
        console.log('Minter added successfully. ' + _minterAddress);
        return tx.hash;
    }
    catch(err){
        console.log(err);
    }
}

const getNFTs = async(_studentAddress) => {
  try{
  const provider = new hre.ethers.JsonRpcProvider('http://127.0.0.1:8545');
  const smartContractAddress = process.env.CONTRACT_ADDRESS;
  const signer = await provider.getSigner();
  const contract = new hre.ethers.Contract(smartContractAddress, contractAbi, provider);
    const result = await contract.getNFTs(_studentAddress);
    console.log("getCertificates result: ", result);
    return result;
  }
  catch(err) {
    console.log("Error: ", err);
  }
}



module.exports = { addMinter, getNFTs, getContractInstance};