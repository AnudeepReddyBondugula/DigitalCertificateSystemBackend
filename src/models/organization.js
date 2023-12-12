const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    organizationName : { type: String, required : true},
    walletAddress : {type : String, required : true},
    publicKey : {type : String, required : true},
    privateKey : {type : String, required : true}
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;