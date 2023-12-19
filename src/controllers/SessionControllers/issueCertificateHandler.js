const Organization = require("../../models/Organization");
const User = require("../../models/User");
const { saveData, saveFile } = require("../../services/IpfsManager");
const { mintNFT } = require("../../services/SmartContractManager");
const { storeFileTemp } = require("../../utils/helper");

const issueCertificateHandler = async (req, res) => {
    try{
        try{
            req.body.certificateDetails = JSON.parse(req.body.certificateDetails);
        } catch(err){
            return res.status(400).json({
                error : "Bad request"
            })
        }
        let {username, certificateName, issueDate, expiryDate} = req.body.certificateDetails;
        const {username : organizationUsername} = req.body.jwTokenData;
        const {certificateFile} = req.files;

        if (!(username && certificateName && certificateFile)){
            return res.status(400).json({
                error : "Required fields are empty"
            })
        }

        const user = await User.findOne({username});
        if (!user){
            return res.status(404).json({
                error : "User not found"
            })
        }

        const filePath = await storeFileTemp(certificateFile, certificateName);
        const fileCID = await saveFile(filePath);
        const organizationUser = await Organization.findOne({username : organizationUsername});

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
        const certificateMetaDataCID = await saveData(JSON.stringify(certificateMetaData))
        try{
            await mintNFT(organizationUser.privateKey, user.walletAddress, certificateMetaDataCID);
        } catch (err){
            return res.status(402).json({
                error : "Insufficient funds" // TODO : Need to check the type of error and return according to that
            })
        }
        return res.status(201).json({
            message : "Issue certificate success",
            role : "organization"
        })
    } catch(err){
        console.error("Error in issue Certificate Handler");
        console.error(err);
        return res.status(500).json({
            error : "Internal server error"
        })
    }
}

module.exports = {issueCertificateHandler}