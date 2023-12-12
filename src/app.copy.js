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
  getPDFHash
} = require("./utils/crypto-helper");

const {
  saveData,
  getData,
  saveFile
} = require("./utils/ipfs-helper");

const {
    addMinter
} = require("./utils/blockchain-helper");

const {
  getCertificatesData, moveFileAsync
} = require("./utils/helpers");
const fs = require('fs');


require("dotenv").config();

// * Creating Server
const app = express();


//* Middlewares
app.use(cors());
app.use(bodyParser.json());

// * Verifies the user JWToken -> Used for protected Pages

// * Used for verifying the credentials -> Login Page


// * Routes

// ** USER ROUTES


app.post("/org/mint", verifyToken, fileUpload({ createParentPath : true}),  async(req, res) => {
  const certificateFile = req.files.certificateFile;
  const {certificate_name, student_address, student_email, student_name, issue_date, expire_date} = req.body;
  if (!(certificateFile && student_address)){
    res.status(401).json({message : "Invalid certificate or student address!"});
    return;
  }
  else{
    let user = await User.findOne({publicaddress: student_address});
    if (!user) user = await User.findOne({email : student_email});
    if (!user){
      res.status(401).json({message : "Invalid student address!"});
      return;
    }
    const uploadPath = __dirname+ "/tmp/" + certificateFile.name;

    await moveFileAsync(certificateFile, uploadPath);

    const fileHash = await getPDFHash(uploadPath);

    const certificate_cid = await saveFile(uploadPath);

    const metaData = {
      hash : fileHash,
      certificate_cid,
      issuer_publicaddress : req.user.publicaddress,
      issuedBy: req.user.fullname,
      issuedDate : issue_date,
      expireDate : expire_date,
      recipient_publicaddress : user.publicaddress,
      certificate_name,
      student_name
    }

    const metadata_cid = await saveData(JSON.stringify(metaData));
    res.json({message : "Certificate Minted Successfully!", metadata_cid});
  }
})

app.post("/org/verifycert", verifyToken, async (req, res) => {
  const {student_address, student_email, description} = req.body;
  if (!(student_address && student_email && description)){
    res.status(401).json({message : "Unauthorized!"});
    return;
  }
  const student = await User.findOne({email : student_email})
  if (!student){
    res.status(401).json({message : "Invalid User!"});
    return;
  }

  const {email} = req.user;
  const user = await Organization.findOne({email});
  const notification = {
    name : user.name,
    email : user.email,
    description : description
  }

  await User.updateOne({student_email : email}, {
    $set : {
      notifications : [...user.notifications, notification]
    }
  })

  return res.json(notification);
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

app.get("/profile", async(req, res) => {
  const {email, publicaddress} = req.body;
  if (!(email || publicaddress)){
    res.status(401).json({message : "Invalid Inputs"})
  }

  let user = await User.findOne(email ? email : publicaddress);
  if (!user) user = await Organization.findOne(email ? email : publicaddress);

  res.json({
    // TODO : send ID also
    email : user.email,
    name : user.name,
    publicaddress : user.publicaddress
  })
  
})

app.get("/getCertificates", verifyToken, async(req, res) => {
  let {student_address} = req.body;
  if (!student_address){
    student_address = req.user.publicaddress;
  }
  return res.json(await getCertificatesData(student_address));
})

app.post("/downloadCertificate", verifyToken, async(req, res) => {
  const {certificate_cid} = req.body;
  const uploadPath = __dirname + "/tmp/" + certificate_cid + ".pdf";
  const pdfBuffer = await getData(certificate_cid);
  fs.writeFileSync(uploadPath, pdfBuffer, null);
  res.download(uploadPath, function(err){
    if(err){
      console.log("Error in sending file");
    } else{
      console.log("File Sent SuccessFully!");
    }
  })
})


module.exports = app;