const {create} = require("ipfs-http-client")

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

module.exports = {getIpfsClient, saveData, getData};