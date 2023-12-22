// Importing the mongoose module to interact with the MongoDB
const mongoose = require('mongoose');

// Creating the user schema by specifying the required fields
const userSchema = new mongoose.Schema({
    username : {type : String, required : true},
    password: { type: String, required: true },
    aadharNumber : { type: String, required : true},
    fullName : { type: String, required : true},
    privateKey : {type : String, required : true},
    publicKey : {type : String, required : true},
    walletAddress : {type : String, required : true}
});

// Creating the Mongoose model based on userSchema
const User = mongoose.model('User', userSchema);

// Exporting the User model to use it in the other parts of the application
module.exports = User;