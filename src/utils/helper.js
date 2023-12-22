const Organization = require("../models/organization");
const User = require("../models/User");
const {getUserNFTsMetaData, getUserNFTsTokenIDs} = require("../services/SmartContractManager");
require("dotenv").config();


const getUser = async (filter) => {
    let user = await Organization.findOne(filter);
    if (!user){
        user = await User.findOne(filter);
        if (user){
            return {user, role : "user"};
        }
        else return null;
    }
    else {
        return {user, role : "organization"};
    }
}

const generateListOfCertificatesMetaData = async (walletAddress) => {
    const userNFTsMetaData = await getUserNFTsMetaData(walletAddress);
    const userNFTsTokenIDs = await getUserNFTsTokenIDs(walletAddress);
    const len = userNFTsTokenIDs.length;
    const listOfCertificatesMetaData = [];

    for(let i = 0; i < len; i++){
        const certificateMetaData = {
            certificateID : userNFTsTokenIDs[i],
            certificateMetaData : userNFTsMetaData[i]
        }
        listOfCertificatesMetaData.push(certificateMetaData);
    }
    return listOfCertificatesMetaData;
}

const storeFileTemp = async (certificateFile, certificateName) => {
    const uploadPath = process.env.UPLOAD_PATH + certificateName;
    return new Promise((resolve, reject) => {
        certificateFile.mv(uploadPath, (err) => {
            if (err) reject(err);
            else resolve(uploadPath);
        })
    })
}


module.exports = {getUser, generateListOfCertificatesMetaData, storeFileTemp};