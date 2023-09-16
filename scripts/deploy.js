const hre = require("hardhat");

async function main() {
  const digiCert = await hre.ethers.deployContract("DigiCert");

  await digiCert.waitForDeployment();

  console.log("SmartContract address: ", digiCert.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
