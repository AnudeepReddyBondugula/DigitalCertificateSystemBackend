const Organization = require("../models/organization");
const User = require("../models/user");
const {getUserNFTsMetaData, getUserNFTsTokenIDs} = require("../services/SmartContractManager");


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
}


module.exports = {getUser, generateListOfCertificatesMetaData};