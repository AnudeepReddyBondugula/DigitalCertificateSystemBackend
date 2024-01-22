// Importing the mongoose module to interact with the MongoDB 
const mongoose = require('mongoose');

// Creating the organization schema by specifying the required fields
const organizationSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    organizationName : { type: String, required : true},
    walletAddress : {type : String, required : true},
    publicKey : {type : String, required : true},
    privateKey : {type : String, required : true}
});

// Creating a Mongoose model based on the organizationSchema
const Organization = mongoose.model('Organization', organizationSchema);

// Exporting the Organization model to use it in the other parts of the application
module.exports = Organization;