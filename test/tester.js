// const fs = require('fs')
// const {decryptWithPrivateKey, encryptWithPublicKey} = require('../utils/crypto-helper');

// async function main() {
//     let pdfFile = fs.readFileSync('D:\\git\\DigitalCertificateSystemBackend\\test\\Sravan_Resume.pdf');
//     console.log(pdfFile)
//     const encryptData = await encryptWithPublicKey('04492bc5fb210c9e0f9fef467d2a02df05f3bc35af3e7ddfe88d9f5da944992f8ccba1b9023a01cea6a1181951e971205a3b1cf41860a70a11bd38196ff8ed2e18', pdfFile);

//     const result = await decryptWithPrivateKey('6b20edbf0499ea9d91e8ad301a532463a170de4fd940a7ad87fe8bccb94b41d5', encryptData);
//     // console.log(result);
//     fs.writeFileSync('result.pdf', Buffer.from(result, 'utf-8'), null); 
// }

// main();
