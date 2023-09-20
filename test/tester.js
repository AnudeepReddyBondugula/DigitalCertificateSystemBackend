// const {decryptWithPrivateKey, encryptWithPublicKey} = require('../utils/crypto-helper');
const { getPDFHash } = require("../utils/crypto-helper");
const {getData} = require("../utils/ipfs-helper");
const fs = require('fs')

async function main() {
    console.log(await getPDFHash('D:\\git\\DigitalCertificateSystemBackend\\result.pdf'))
}

main();
