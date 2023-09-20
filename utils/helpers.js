const {getNFTs} = require('./blockchain-helper');
const {getData} = require('./ipfs-helper');

const getCertificatesData = async (publicaddress) => {
    const tokenURIs = (await getNFTs(publicaddress)).toArray();
    const result = await Promise.all(tokenURIs.map(async (tokenURI) => {
        const buffer = await getData(tokenURI);
        const data = JSON.parse(buffer.toString());
        return data;
    }));

    return result;

}

module.exports = {getCertificatesData};