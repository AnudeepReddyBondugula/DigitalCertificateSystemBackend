const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    aadharNumber : { type: String, required : true},
    fullName : { type: String, required : true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;