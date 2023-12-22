<<<<<<< HEAD
// Defining a function to handle requests to the DigiLocker 
const digiLockerHandler = (req, res, next) => {
    // yet to be completed!!!
=======
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
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
}

// Exporting the digiLockerHandler to use it in the other parts of the application
module.exports = {digiLockerHandler}