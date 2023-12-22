// Importing user schema and required functions
const {getNFTMetaData} = require("../../services/SmartContractManager");
const User = require("../../models/User");
const { generateListOfCertificatesMetaData } = require("../../utils/helper");


// Defining an async function to handle requests to certificate verification
const certificateVerificationHandler = async (req, res) => {
    try{
        // If user details not provided: return an error message along with a status code
        if (!req.body.userDetails) return res.status(400).json({error : "Required fields are empty"})

        // Destructuring the user details
        const {certificateID, username} = req.body.userDetails;

        if (username){
            // Searching user data in database using username
            const user = await User.findOne({username});

            // If user found: resulting wallet address and listOfCertificatesMetaData
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

            // Extraxting the NFT meta data using the sertificateID
            const certificateMetaData = await getNFTMetaData(certificateID);

            // If not found: return status code along with an error
            if (!certificateMetaData){
                return res.status(404).json({
                    error : "Invalid certificate ID"
                })
            }

            // else return certificate meta data along with the certificateID
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
        // Catching an handling the errors
        console.error("Error in certificate verification handler", err);
        return res.status(500).json({
            error : "Internal server error"
        })
        
    }
}

// Exporting the certificateVerificationHandler to use it in the other parts of the application
module.exports = {certificateVerificationHandler}