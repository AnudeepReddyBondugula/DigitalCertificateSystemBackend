const {getNFTs} = require('./blockchain-helper');
const {getData} = require('./ipfs-helper');
const Organization = require("../models/organization");
const User = require("../models/user");


const getCertificatesData = async (publicaddress) => {
    const tokenURIs = (await getNFTs(publicaddress)).toArray();
    const result = await Promise.all(tokenURIs.map(async (tokenURI) => {
        const buffer = await getData(tokenURI);
        const data = JSON.parse(buffer.toString());
        return data;
    }));

    return result;

}

const moveFileAsync = async (certificateFile, uploadPath) => {
    new Promise((resolve, reject) => {
        certificateFile.mv(uploadPath, function (err){
            if (err) reject(err)
            else resolve("File Uploaded SuccessFully!");
        })
    })
}

const getUser = async (filter) => {
    let user = await Organization.findOne(filter);
    if (!user){
        user = await User.findOne(filter);
        if (user){
            user.role = 'user';
            return user;
        }
        else return null;
    }
    else {
        user.role = 'organization';
        return user;
    }
}


module.exports = {getUser};