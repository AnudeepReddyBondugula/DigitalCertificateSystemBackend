// Importing the user schema and required functions
const User = require("../../models/User");
const { getRandomKeysAndAddresses } = require("../../utils/crypto-helper");

// Defining an async function to handle requests for creating user
const createUserHandler = async (req, res) => {

    // Destructuring the user details from request body
    const {username, password, fullName, aadharNumber} = req.body;

    // Checking whether all details are provided
    if (!(username && password && fullName && aadharNumber)){
        return res.status(400).json({
            error : "Required fields are empty"
        })
    }
    
    let user = await User.findOne({aadharNumber}); // * Checking if the User aadharcard is aldready registered
    
    // If user already exists: return a status code along with an error
    if (user){
        return res.status(409).json({
            error : "User already exists"
        })
    }
   
    // Generating cryptographic keys and walletAddress
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

    // After user added successfully: return signup success message
    return res.status(201).json({
        message : "Signup success"
    })
}

// Exporting the createUserHandler function to use it in the other parts of the application
module.exports = {createUserHandler};