const User = require("../../models/user");
const { generateListOfCertificatesMetaData } = require("../../utils/helper");

const digiLockerHandler = async (req, res) => {
    try{
        const {username} = req.body.jwTokenData;
        const {walletAddress} = await User.findOne({username});
        const listOfCertificatesMetaData = await generateListOfCertificatesMetaData(walletAddress);
        res.json(listOfCertificatesMetaData);
    } catch(err){
        res.status(500).json({
            message : "Internal Server Error"
        })
        console.error("Error in DigiLockerHandler");
        console.error(err);
    }
}

module.exports = {digiLockerHandler}