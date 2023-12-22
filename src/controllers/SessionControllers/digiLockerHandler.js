// Importing the user schema and required modules
const User = require("../../models/User");
const { generateListOfCertificatesMetaData } = require("../../utils/helper");

// Defining an async function to handle requests to DigiLocker
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

// Exporting the digiLockerHandler to use it in the other parts of the application
module.exports = {digiLockerHandler}