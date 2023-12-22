// Importing user and organization schemas, and required functions
const Organization = require("../models/organization");
const User = require("../models/User");
const {getUserNFTsMetaData, getUserNFTsTokenIDs} = require("../services/SmartContractManager");

// Importing dotenv to load environment variables
require("dotenv").config();

// Defining a function to get user based on the filter
const getUser = async (filter) => {

    // Attempting to find an organization based on the filter
    let user = await Organization.findOne(filter);
    if (!user){

        // If no organization, attempt to find a user
        user = await User.findOne(filter);
        if (user){

            // If user found: return the user and role as user
            return {user, role : "user"};
        }
        else return null; // If neither organization nor user is found, return null
    }
    else {
        // If organization is found: return organization and role as organization
        return {user, role : "organization"};
    }
}

// Defining a function to generate a list of certificate metadata for given wallet address
const generateListOfCertificatesMetaData = async (walletAddress) => {

    // Extracting metadata and token IDs for NFTs associated with user's wallet address
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

// Defining to store a file temporarily
const storeFileTemp = async (certificateFile, certificateName) => {
    const uploadPath = process.env.UPLOAD_PATH + certificateName;
    
    // Returning a promise that moves the certificate file to the specified path
    return new Promise((resolve, reject) => {
        certificateFile.mv(uploadPath, (err) => {
            if (err) reject(err);
            else resolve(uploadPath);
        })
    })
}

// Exporting functions as object to use them in other parts of the application
module.exports = {getUser, generateListOfCertificatesMetaData, storeFileTemp};