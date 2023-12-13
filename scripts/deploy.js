const hre = require("hardhat");

async function main() {
  const digiCert = await hre.ethers.deployContract("DigiCert");

  await digiCert.waitForDeployment();

  console.log("SmartContract address: ", digiCert.target);
  console.log("DON'T FORGET TO UPDATE THE CONTRACT ABI AND SMART CONTRACT ADDRESS IN THE smartContractConfig.js")
  // console.log("In Script.js")
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
