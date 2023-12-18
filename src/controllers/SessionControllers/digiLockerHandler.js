const User = require("../../models/User");
const { generateListOfCertificatesMetaData } = require("../../utils/helper");

const digiLockerHandler = async (req, res) => {
    try{
        const {username} = req.body.jwTokenData;
        const {walletAddress} = await User.findOne({username});
        const listOfCertificatesMetaData = await generateListOfCertificatesMetaData(walletAddress);
        res.json({listOfCertificatesMetaData});
    } catch(err){
        console.error("Error in DigiLockerHandler", err);
        return res.status(500).json({
            error : "Internal server error"
        })
    }
}

module.exports = {digiLockerHandler}