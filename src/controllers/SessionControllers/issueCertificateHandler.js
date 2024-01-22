// Importing organization, user schemas and required functions
const Organization = require("../../models/organization");
const User = require("../../models/User");
const { saveData, saveFile } = require("../../services/IpfsManager");
const { mintNFT } = require("../../services/SmartContractManager");
const { storeFileTemp } = require("../../utils/helper");

// Defining an async function to handle requests to certificate issuance
const issueCertificateHandler = async (req, res) => {
    try{
        try{
            req.body.certificateDetails = JSON.parse(req.body.certificateDetails);
        } catch(err){
            return res.status(400).json({
                error : "Bad request"
            })
        }

        // Destructuring the field values present in certificate
        let {username, certificateName, issueDate, expiryDate} = req.body.certificateDetails;
        const {username : organizationUsername} = req.body.jwTokenData;
        const {certificateFile} = req.files;
        
        // Checking whether any fields are empty
        if (!(username && certificateName && certificateFile)){
            return res.status(400).json({
                error : "Required fields are empty"
            })
        }
        
        // Checking user details in the database
        const user = await User.findOne({username});
        if (!user){
            return res.status(404).json({
                error : "User not found"
            })
        }

        // Storing the certificate file temporarily and obtaining its CID
        const filePath = await storeFileTemp(certificateFile, certificateName);
        const fileCID = await saveFile(filePath);

        // Finding organization details in the database
        const organizationUser = await Organization.findOne({username : organizationUsername});


        // Creating metadata for certificate
        const certificateMetaData = {
            Issuer : {
                username : organizationUsername,
                walletAddress : organizationUser.walletAddress,
                organizationName : organizationUser.organizationName
            },
            Recipient : {
                username : user.username,
                walletAddress : user.walletAddress
            },
            CertificateName : certificateName,
            IssueDate : issueDate,
            ExpiryDate : expiryDate,
            CertificateURI : fileCID // ? Add image URI of certificate
        }

        // Saving certificate metadata to IPFS and obtaining its CID
        const certificateMetaDataCID = await saveData(JSON.stringify(certificateMetaData))

        // Attempting to mint an NFT for certificate
        try{
            await mintNFT(organizationUser.privateKey, user.walletAddress, certificateMetaDataCID);
        } catch (err){
            return res.status(402).json({
                error : "Insufficient funds" // TODO : Need to check the type of error and return according to that
            })
        }

        // Returning success response if everything is successful
        return res.status(201).json({
            message : "Issue certificate success",
            role : "organization"
        })
    } catch(err){
        // Handling errors and logging to console
        console.error("Error in issue Certificate Handler");
        console.error(err);
        return res.status(500).json({
            error : "Internal server error"
        })
    }
}

// Exporting the issueCertificateHandler to use it in the other parts of the application
module.exports = {issueCertificateHandler}