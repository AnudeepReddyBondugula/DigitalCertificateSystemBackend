const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName : { type: String, required : true}
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;