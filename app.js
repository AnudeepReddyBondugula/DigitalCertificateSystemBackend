// * Importing packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
require('dotenv').config();

// * Creating Server
const app = express()
const port = 3000


// * Schemas
const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    publicaddress : String,
    aadharcard : String,
    certificates : [String]
})

const organizationSchema = new mongoose.Schema({
    username : String,
    password : String,
    publicaddress : String
})


// * Define mongoose models
const User = mongoose.model('User', userSchema);
const Organization = mongoose.model('Organization', organizationSchema);

// * Connecting to MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.b02wbxn.mongodb.net/digicert`, {useNewUrlParser: true, useUnifiedTopology: true});


//* Middlewares
app.use(cors());
app.use(bodyParser.json());

// * Verifies the user JWToken -> Used for protected Pages
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded;
        next();
    });
};


// * Used for verifying the credentials -> Login Page
const verifyCred = async (req, res, next) => {
    const {username , password} = req.body;

    if (!(username && password)){
        return res.status(401).json({message : "Unauthorized"})
    }
    else{
        const user = await User.findOne({username, password});
        if (user){
            next();
        }
        else{
            return res.status(401).json({message: "Unauthorized"})
        }
    }
    

}





// * Routes


// ** USER ROUTES
app.post('/user/login', verifyCred, async(req, res) => {
    const token =  jwt.sign({username : req.body.username}, process.env.SECRET, {expiresIn : '1h'});

    res.json({message : "Login Success!",
              token : token});
})

app.post('/user/signup' ,async (req, res) => {

    const {username, password, publicaddress, aadharcard} = req.body;

    if (!(username && password && publicaddress && aadharcard)){
        res.status(401).json({message : "Unauthorized"});
        return;
    }
    // ! Validate for username, publicAddress and aadharcard later
    
    // * Check if user aldready exists!
    const user = await User.findOne({username});
    if (user){
        return res.status(401).json({message : "User Aldredy Exists!"});
    }
    const newUser = new User({
        username,
        password,
        publicaddress,
        aadharcard
    })

    await newUser.save();

    const token =  jwt.sign({username}, process.env.SECRET, {expiresIn : "1h"});

    res.status(201).json({message : "User Created Successfully",
              token : token});
    
})

app.get("/user/dashboard", verifyToken, async (req, res)=> {
    const {username} = req.body;
    res.json({message : "DashBoard Success!", user: req.user})
})



// * ORGANISATION ROUTES
app.post('/org/login', verifyCred, async(req, res) => {
    const token =  jwt.sign({username : req.body.username}, process.env.SECRET, {expiresIn : '1h'});

    res.json({message : "Login Success!",
              token : token});
})

app.post('/org/signup' ,async (req, res) => {

    const {username, password, publicaddress} = req.body;

    if (!(username && password && publicaddress)){
        res.status(401).json({message : "Unauthorized"});
        return;
    }
    // ! Validate for username, publicAddress later
    
    // * Check if user aldready exists!
    const user = await User.findOne({username});
    if (user){
        return res.status(401).json({message : "User Aldredy Exists!"});
    }
    const newUser = new User({
        username,
        password,
        publicaddress
    })

    await newUser.save();

    const token =  jwt.sign({username}, process.env.SECRET, {expiresIn : "1h"});

    res.status(201).json({message : "User Created Successfully",
              token : token});
    
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// * Helper Functions

const isValidEmail = (_email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return emailRegex.test(_email);
}

const isValidPublicAddress = (_publicAddr) => {
    const publicAddrRegex = /^0x[a-fA-F0-9]{40}$/gm;
    return publicAddrRegex.test(_publicAddr);
}

const isValidAadharCard = (_aadharCard) => {
    const aadharCardRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/

    return aadharCardRegex.test(_aadharCard);
}

const isValidUser = (_username, _password) => {
    for(var i in Users){
        const {username, password} = Users[i];
        if (username == _username && password == _password){
            return true;
        }
    }
    return false;
}

