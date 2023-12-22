// Importing the ipfs-http-client library
const ipfsHttpClient = require("ipfs-http-client");

// Destructuring values from ipfsConfig file
const {hostUrl, port, protocol} = require("../config/ipfsConfig");

// Importing the fs file module
const fs = require("node:fs/promises")

// Creating an instance of IPFS client with specified configuration
function getIpfsClient() {
    const ipfsClient = ipfsHttpClient.create({
        host : hostUrl,
        port,
        protocol
    });

    // returning the IPFS client instance
    return ipfsClient;
}

// Defining an async function to save data to IPFS and return resulting CID
async function saveData(data) {
    const ipfsClient = getIpfsClient();
    const result = await ipfsClient.add(data);
    return result.path;
}

//Defining an asyns function to retrieve data from IPFS using CID
async function getData(hash) {
    const ipfs = await getIpfsClient();
    let accumalatedBuffer = []

    // Using ipfs.cat to retrieve data from IPFS
    const content = ipfs.cat(hash);

    // Iterating over the content and accumulating the data buffers
    for await (const itr of content){
        accumalatedBuffer.push(Buffer.from(itr));
    }
    return Buffer.concat(accumalatedBuffer);
}

// Defining an async function to save file to IPFS an d returning its CID
async function saveFile(filePath) {
    const fileBuffer = await fs.readFile(filePath);
    const cid = await saveData(fileBuffer);
    return cid;
}

// Exporting saveData, getData and saveFile async function as an object to use in the other parts of the application
module.exports = {saveData, getData, saveFile};