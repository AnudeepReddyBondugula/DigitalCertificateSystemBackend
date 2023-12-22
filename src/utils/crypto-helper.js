const keccak256 = require('js-sha3').keccak256;
const Buffer = require('buffer').Buffer;
const { createECDH } = require("node:crypto");

function getRandomKeysAndAddresses() {
	const keysGenerator = createECDH('secp256k1');
	keysGenerator.generateKeys();
	const privateKey = keysGenerator.getPrivateKey('hex');
	const publicKey = keysGenerator.getPublicKey('hex');
	const walletAddress = getAddress(publicKey);
	return {privateKey, publicKey, walletAddress}
}

function getAddress(publicKey){

    const publicKeyBuffer = Buffer.from(publicKey.substring(2), 'hex');
    const hash = keccak256(publicKeyBuffer);
    const walletAddress = '0x' + hash.substring(24);
    return walletAddress;
}

module.exports = {
	getRandomKeysAndAddresses
};