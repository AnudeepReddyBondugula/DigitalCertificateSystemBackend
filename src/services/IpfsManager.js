const ipfsHttpClient = require("ipfs-http-client");
const {hostUrl, port, protocol} = require("../config/ipfsConfig");
const fs = require("node:fs/promises")


function getIpfsClient() {
    const ipfsClient = ipfsHttpClient.create({
        host : hostUrl,
        port,
        protocol
    });

    return ipfsClient;
}

async function saveData(data) {
    const ipfsClient = getIpfsClient();
    const result = await ipfsClient.add(data);
    return result.path;
}

async function getData(hash) {
    const ipfs = await getIpfsClient();
    let accumalatedBuffer = []
    const content = ipfs.cat(hash);
    for await (const itr of content){
        accumalatedBuffer.push(Buffer.from(itr));
    }
    return Buffer.concat(accumalatedBuffer);
}

async function saveFile(filePath) {
    const fileBuffer = await fs.readFile(filePath);
    const cid = await saveData(fileBuffer);
    return cid;
}

module.exports = {saveData, getData, saveFile};