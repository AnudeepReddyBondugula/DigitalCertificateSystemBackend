const {ethers} = require("hardhat");
async function main () {
    const address = "0x5d66dd41dd94f845726a8535dddec1d5ef281b8b";
    const address2 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
    const balance = await provider.getBalance(address);
    const balance2 = await provider.getBalance(address2);
    console.log(balance);
    console.log(balance2);
}

main();