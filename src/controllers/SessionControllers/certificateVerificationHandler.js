const {getNFTMetaData} = require("../../services/SmartContractManager");
const User = require("../../models/User");
const { generateListOfCertificatesMetaData } = require("../../utils/helper");

const certificateVerificationHandler = async (req, res) => {
    try{
        if (!req.body.userDetails) return res.status(400).json({error : "Required fields are empty"})

        const {certificateID, username} = req.body.userDetails;

        if (username){
            const user = await User.findOne({username});
            if (user){
                const {walletAddress} = user;
                const listOfCertificatesMetaData = await generateListOfCertificatesMetaData(walletAddress);
                return res.json({listOfCertificatesMetaData});
            }
            else{
                return res.status(404).json({
                    error : "User not found"
                })
            }
        }
        else if (certificateID){
            const certificateMetaData = await getNFTMetaData(certificateID);
            if (!certificateMetaData){
                return res.status(404).json({
                    error : "Invalid certificate ID"
                })
            }
            return res.json({
                listOfCertificatesMetaData : [
                    {
                        certificateID,
                        certificateMetaData
                    }
                ]
            })
        }
        else return res.status(400).json({error : "Required fields are empty"});

    } catch(err) {
        console.error("Error in certificate verification handler", err);
        return res.status(500).json({
            error : "Internal server error"
        })
        
    }
}

module.exports = {certificateVerificationHandler}