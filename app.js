// * Importing packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload')
const path = require('path')
const {
  getPublicKey,
  getAddress,
  encrypt,
  decrpyt,
  encryptWithPublicKey,
  decryptWithPrivateKey,
  getHash
} = require("./utils/crypto-helper");

const {
  saveData,
  getData
} = require("./utils/ipfs-helper");

const {
    addMinter
} = require("./utils/blockchain-helper");
const fs = require('fs');

require("dotenv").config();

// * Creating Server
const app = express();
const port = 3000;

// * Schemas
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  privatekey: String,
  publickey : String,
  publicaddress: String,
  fullname: String,
  aadharcard: String,
});

const organizationSchema = new mongoose.Schema({
  email: String,
  password: String,
  privatekey: String,
  publickey : String,
  publicaddress: String,
  fullname : String,
});

// * Define mongoose models
const User = mongoose.model("User", userSchema);
const Organization = mongoose.model("Organization", organizationSchema);

// * Connecting to MongoDB
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.b02wbxn.mongodb.net/digicert`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//* Middlewares
app.use(cors());
app.use(bodyParser.json());

// * Verifies the user JWToken -> Used for protected Pages
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
};

// * Used for verifying the credentials -> Login Page
const verifyCred = async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    let user = await User.findOne({email, password});
    if (!user) user = await Organization.findOne({email, password});

    if (user) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};

// * Routes

// ** USER ROUTES

app.post("/user/signup", async (req, res) => {
  const { email, password, privatekey, aadharcard, name } = req.body;

  if (!(email && password && privatekey && aadharcard && name)) {
    res.status(401).json({ message: "Invalid Inputs" });
    return;
  }
  // TODO: Validate for username, privateKey and aadharcard later

  // * Check if user aldready exists!
  // ? validate also for users having same public address(optional)
  const user = await User.findOne({ email });
  if (user) {
    return res.status(401).json({ message: "User Aldready Exists!" });
  }
  const publickey = getPublicKey(privatekey);
  const publicaddress = getAddress(publickey);
  const cipherText = encrypt(privatekey, password);
  const newUser = new User({
    email,
    password,
    privatekey: cipherText,
    publickey,
    publicaddress,
    aadharcard,
    fullname : name
  });

  await newUser.save();

  const token = jwt.sign({ email, role : "student" }, process.env.SECRET, { expiresIn: "1h" });

  res.status(201).json({ message: "User Created Successfully", token: token });
});
app.post("/user/login", verifyCred, async (req, res) => {
  const token = jwt.sign({ email: req.body.email, role : "student" }, process.env.SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login Success!", token: token });
});

app.get("/user/dashboard", verifyToken, async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({email});

  res.json({name: user.name, publicaddress : user.publicaddress});
});

// * ORGANISATION ROUTES
app.post("/org/signup", async (req, res) => {
    try{
        const { email, password, privatekey, name } = req.body;
        if (!(email && password && privatekey && name)) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        
        // TODO: Validate for username, privateKey later
    
        // * Check if user aldready exists!
        // ? validate also for users having same public address(optional)
        const user = await Organization.findOne({ email });
        if (user) {
            return res.status(401).json({ message: "User Aldready Exists!" });
        }
        const publickey = getPublicKey(privatekey);
        const publicaddress = getAddress(publickey);
        const cipherText = encrypt(privatekey, password);
        const newUser = new Organization({
            email,
            password,
            privatekey: cipherText,
            publickey,
            publicaddress,
            fullname : name
        });

        await newUser.save();

        const token = jwt.sign({ email, role : "organization" }, process.env.SECRET, { expiresIn: "1h" });

        await addMinter(publicaddress, "These consists of details of the Organization");
  
        res.status(201).json({ message: "User Created Successfully", token: token });
    }
    catch(err){
        res.status(500).json("Internal Server Error!");
    }
});

app.post("/org/login", verifyCred, async (req, res) => {
  const token = jwt.sign({ email: req.body.email }, process.env.SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login Success!", token: token });
});

app.post("/org/mint", verifyToken, fileUpload({ createParentPath : true}),  async(req, res) => {
  const certificateFile = req.files.certificateFile.data;
  const {student_address, student_email, student_name} = req.body;
  if (!(certificateFile && student_address)){
    res.status(401).json({message : "Invalid certificate or student address!"});
    return;
  }
  else{
    const user = await User.findOne({publicaddress: student_address})
    if (!user){
      res.status(401).json({message : "Invalid student address!"});
      return;
    }
    const fileHash = await getHash(certificateFile);
    const encryptedFile = JSON.stringify(await encryptWithPublicKey(user.publickey, certificateFile));
    const certificate_cid = await saveData(encryptedFile);
    const metaData = {
      hash : fileHash,
      certificate_cid,
      issuer_publicaddress : undefined,
      recipient_publicaddress : undefined
    }

    const metadata_cid = await saveData(JSON.stringify(metaData));
    res.json({message : "Certificate Minted Successfully!", metadata_cid});
  }
})

// * Used to get the smart contract address for frontend Dapp

app.get("/getcontractaddress", async (req, res) => {
  res.json({contractAddress : process.env.CONTRACT_ADDRESS});
})

app.get("/getcontractabi", async (req, res)=> {
  fs.readFile(__dirname + '/artifacts/contracts/DigiCert.sol/DigiCert.json', 'utf-8', (err, data) => {
    if (err){
      console.log("Error reading JSON File:", err);
      res.status(500).json();
      return;
    }
    else{
      try{
        const jsonData = JSON.parse(data);
        res.json({
          contractAbi: jsonData.abi
        })
      }
      catch(err){
        console.log('Error in parsing', err);
        res.status(500).json();
      }
    }
  })
})

app.post("/upload", fileUpload({ createParentPath : true}), (req, res) => {
  // const files = req.files
  // console.log(files);
  res.json({message : "Hello!"});
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
