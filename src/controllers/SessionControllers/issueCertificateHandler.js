const Organization = require("../../models/organization");
const User = require("../../models/user");
const { saveData, saveFile } = require("../../services/IpfsManager");
const { mintNFT } = require("../../services/SmartContractManager");
const { storeFileTemp } = require("../../utils/helper");

const issueCertificateHandler = async (req, res) => {
    try{
        let {username, certificateName, issueDate, expiryDate} = req.body.certificateDetails;
        const {username : organizationUsername} = req.body.jwTokenData;
        const {certificateFile} = req.files;

        if (!(username && certificateName && certificateFile)){
            return res.status(403).json({
                message : "Required Fields Are Empty"
            })
        }

        const user = await User.findOne({username});
        if (!user){
            return res.status(403).json({
                message : "Invalid User"
            })
        }

        // TODO : Need to Store the Certificate and Metadata in IPFS
        const filePath = await storeFileTemp(certificateFile, certificateName);
        const fileCid = await saveFile(filePath);
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
            ExpityDate : expiryDate,
            CertificateURI : fileCid
        }
        const certificateMetaDataCid = await saveData(JSON.stringify(certificateMetaData))
        await mintNFT(organization.privateKey, user.walletAddress, certificateMetaDataCid);
        console.log("Minted Successfully!")
        console.log(certificateMetaData);
    } catch(err){
        res.status(500).json({
            message : "Internal Server Error"
        })
        console.error("Error in issue Certificate Handler");
        console.error(err);
    }
}

module.exports = {issueCertificateHandler}