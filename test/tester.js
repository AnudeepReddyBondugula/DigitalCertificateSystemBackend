const { ethers } = require("hardhat");
const { provider } = require("../src/config/smartContractConfig");
const {saveData, getData, saveFile} = require("../src/services/IpfsManager");
const fs = require("node:fs");
require("dotenv").config();

async function main () {
    // const cid = await saveFile("tmp/pdfs/matlab1.pdf");

    // console.log(cid);

    // const data = await getData(cid);
    // console.log(data);

    // TODO : send GO to organization wallet programatically and test issuecertificate
    const signer = new ethers.Wallet(process.env.OWNER_PRIVATEKEY, provider);
    // const amountInWei = ethers.parseEther("1");
    // const gasPriceInWei = ethers.parseUnits('20', 'gwei');
    // const tx = await signer.sendTransaction({
    //     to : "0x9acb8daeaf4d6a93f21ae1dc43ac095b1aacc856",
    //     value : amountInWei,
    //     gasPrice : gasPriceInWei
    // });
    // console.log("Success : " + tx);
    console.log((await provider.getBalance("0x9acb8daeaf4d6a93f21ae1dc43ac095b1aacc856")).toString());
}

main();