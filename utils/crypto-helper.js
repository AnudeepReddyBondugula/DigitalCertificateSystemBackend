const {ec} = require("elliptic");
const keccak256 = require('js-sha3').keccak256;
const Buffer = require('buffer').Buffer;
const CryptoJS = require('crypto-js');

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

module.exports = {getPublicKey, getAddress, encrypt, decrpyt};