// Importing the required functions and Buffer module
const keccak256 = require('js-sha3').keccak256;
const Buffer = require('buffer').Buffer;
const { createECDH } = require("node:crypto");

// Defining a function to generate random public and private keys, and a wallet address
function getRandomKeysAndAddresses() {
	const keysGenerator = createECDH('secp256k1');
	keysGenerator.generateKeys();
	const privateKey = keysGenerator.getPrivateKey('hex');
	const publicKey = keysGenerator.getPublicKey('hex');
	const walletAddress = getAddress(publicKey);
	return {privateKey, publicKey, walletAddress}
}

// Defining a function to derieve a wallet address for given public key
function getAddress(publicKey){

    const publicKeyBuffer = Buffer.from(publicKey.substring(2), 'hex');
    const hash = keccak256(publicKeyBuffer);
    const walletAddress = '0x' + hash.substring(24);
    return walletAddress;
}

// Exporting the getRandomKeysAndAddresses function to use in the other parts of the application
module.exports = {
	getRandomKeysAndAddresses
};