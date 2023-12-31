const {ec} = require("elliptic");
const keccak256 = require('js-sha3').keccak256;
const Buffer = require('buffer').Buffer;
const CryptoJS = require('crypto-js');
const EthCrypto = require('eth-crypto');
const crypto = require('crypto');
const fs = require('fs');

function getPublicKey(privateKey){
    const secp256k1 = new ec('secp256k1');

    const keyPair = secp256k1.keyFromPrivate(privateKey, 'hex');
    const publicKey = keyPair.getPublic().encode('hex');
    return publicKey;
}

function getAddress(publicKey){
    const publicKeyBuffer = Buffer.from(publicKey.substring(2), 'hex');
    const hash = keccak256(publicKeyBuffer);
    const wal_address = '0x' + hash.substring(24);
    return wal_address;
}

// * Used for encrpytion and decrpytion of privateKey

function encrypt(_plainText, _password){
    return CryptoJS.AES.encrypt(_plainText, _password).toString();
}

function decrpyt(_cipherText, _password){
    return CrpytoJS.AES.decrpyt(_cipherText, _password).toString(CryptoJS.enc.Utf8);
}

function getPDFHash(pdfFilePath) {
    return new Promise((resolve, reject) => {
        const pdfStream = fs.createReadStream(pdfFilePath);
        const hash = crypto.createHash('sha256');
    
        pdfStream.on('data', (data) => {
          hash.update(data);
        });
    
        pdfStream.on('end', () => {
          const hashValue = hash.digest('hex');
          resolve(hashValue);
        });
    
        pdfStream.on('error', (error) => {
          reject(error);
        });
      });
}

async function encryptWithPublicKey(publicKey, data) {
    return await EthCrypto.encryptWithPublicKey(publicKey, data);
}

async function decryptWithPrivateKey(privateKey, data) {
    return await EthCrypto.decryptWithPrivateKey(privateKey, data);
}

module.exports = {
  getPublicKey,
  getAddress,
  encrypt,
  decrpyt,
  getPDFHash,
  encryptWithPublicKey,
  decryptWithPrivateKey,
};