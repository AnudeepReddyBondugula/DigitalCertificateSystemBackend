// const {decryptWithPrivateKey, encryptWithPublicKey} = require('../utils/crypto-helper');
const { getPDFHash } = require("../utils/crypto-helper");
const {getData} = require("../utils/ipfs-helper");
const fs = require('fs')
const {generateKeyPairSync} = require('crypto');

async function main() {
    const {privateKey, publicKey} =  generateKeyPairSync('rsa', {
        modulusLength : 2048,
        publicKeyEncoding : {
            type : 'spki',
            format : 'pem'
        },
        privateKeyEncoding : {
            type : 'pkcs8',
            format : 'pem'
        }
    })
    console.log(privateKey)
    console.log(publicKey)
}

main();
