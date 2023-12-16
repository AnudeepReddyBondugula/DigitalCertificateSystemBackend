const {getNFTMetaData} = require("../../services/SmartContractManager");
const User = require("../../models/user");

const certificateVerificationHandler = async (req, res) => {
    try{
        const {certificateID, username} = req.body.userDetails;
        if (certificateID){
            const certificateMetaData = await getNFTMetaData(certificateID);
            return res.json(
                {
                    certificateID,
                    certificateMetaData
                }
            )
        }
        else if (username){
            const user = await User.findOne({username});
            if (user){
                const {walletAddress} = user;
                
                return res.json(listOfCertificatesMetaData);
            }
            else{
                return res.status(403).json({
                    message : "Invalid Username"
                })
            }
        }
        else{
            return res.status(403).json({
                message : "Required Fields Are Empty"
            });
        }
    } catch(err) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
        console.error("Error in certificate verification");
        console.error(err);
        
    }
}

module.exports = {certificateVerificationHandler}