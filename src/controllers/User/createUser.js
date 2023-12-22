// Importing the required modules
const User = require("../../models/User");
const { getRandomKeysAndAddresses } = require("../../utils/crypto-helper");

// Creating a new user
const createUser = async (body) => {

    // Destructuring the user details from the body object
    const {username, password, fullName, aadharNumber} = body;

    // Input Validation: Checking if all required fields are present
    if (!(username && password && fullName && aadharNumber)){

        // Throwing an error if any required field is missing
        throw Error(JSON.stringify({
            status : 403,
            message : "Required Fields Are Empty!"
        }));
    }
    
    let user;

    try{
        user = await User.findOne({aadharNumber}); // * Checking if the User aadharcard is aldready registered
    }catch(err){
        
        // Throwing an error with a status code of 500 along with a message 
        throw Error(JSON.stringify({
            status : 500,
            message : "Internal Server Error"
        }))
    }
    if (user){

        // If user already exists: Logging a message to the console
        console.log("[FAILED] User Aldready Exists!");

        // Throwing an error to notify user already exists
        throw Error(JSON.stringify({
            status : 403,
            message : "User Already Exists"
        }))
    }
    try{

        // Generating cryptographic keys and addresses
        const {privateKey, publicKey, walletAddress} = getRandomKeysAndAddresses();

        // Creating a new user instance
        user = await User({
            username,
            password,
            fullName,
            aadharNumber,
            privateKey,
            publicKey,
            walletAddress
        })

        // Adding user to the database
        await user.save();
    }catch(err){

        // If error: Throwing an error with a status code of 500 along with a message
        throw Error(JSON.stringify({
            status : 500,
            message : "Internal Server Error"
        }))
    }

    // Returning true if user creation process is successful
    return true;
}

// Exporting the createUser function to use it in the other parts of the application
module.exports = {createUser};