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

async function saveData(file) {
    try{
        const ipfsClient = getIpfsClient();
        const result = await ipfsClient.add(file);
        return result.path;
    } catch(err) {
        console.error(err.message);
        return null;
    }
}

async function getData(hash) {
    try{
        const ipfs = await getIpfsClient();
        let accumalatedBuffer = []
        const content = ipfs.cat(hash);
        for await (const itr of content){
            accumalatedBuffer.push(Buffer.from(itr));
        }
        return Buffer.concat(accumalatedBuffer);
    } catch(err) {
        console.error("Error in Ipfs Manager getData :", err.message);
        return null;
    }
}

async function saveFile(filePath) {
    try{
        const fileBuffer = await fs.readFile(filePath);
        const cid = await saveData(fileBuffer);
        return cid;
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {saveData, getData, saveFile};