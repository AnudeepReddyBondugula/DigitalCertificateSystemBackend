// Importing the create function and fs module
const {create} = require("ipfs-http-client")
const fs = require('fs');

// Defining an async function to create an IPFS client instance
async function getIpfsClient() {
    const ipfs = await create(
        {
            host : "127.0.0.1",
            port : 5001,
            protocol: "http"
        }
    );

    return ipfs;
}


// * Stores the file in IPFS and returns the hash (path) (CID)

// Parameter for the function is a file
async function saveData(file) {
    let ipfs = await getIpfsClient();
    let result = await ipfs.add(file);
    return result.path;
}


// * Retrieves the content from the IPFS for the respective hash (CID)
async function getData(hash){
    const ipfs = await getIpfsClient();
    let accumalatedBuffer = []
    const content = ipfs.cat(hash);
    for await (const itr of content){
        accumalatedBuffer.push(Buffer.from(itr));
    }
    return Buffer.concat(accumalatedBuffer);
}

// Defining an async function to store file in IPFS and returns its CID

// Parameter for this function is file path
async function saveFile(filePath) {
    const pdfBuffer = fs.readFileSync(filePath);
    const ipfs = await getIpfsClient();
    const result = await ipfs.add(pdfBuffer)
    return result.path;
}


// Exporting the files as object to use in other parts of the application
module.exports = {getIpfsClient, saveData, getData, saveFile};