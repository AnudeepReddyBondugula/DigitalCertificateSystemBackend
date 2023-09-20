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
  notifications : [Object],
  approve_requests : [Object]

});

const organizationSchema = new mongoose.Schema({
  email: String,
  password: String,
  privatekey: String,
  publickey : String,
  publicaddress: String,
  fullname : String,
  notifications : [Object],
  approve_responses : [Object]
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

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (decoded.role == "student"){
      req.user = await User.findOne({email : decoded.email});
    }
    else{
      req.user = await Organization.findOne({email : decoded.email});
    }
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

  // ! Send number of approve requests and any new notifications to the user (You have recieved a new certificate)

  res.json({name: user.name, publicaddress : user.publicaddress});
});

app.get("/user/notifications", verifyToken, async(req, res) => {
  const {publicaddress} = req;
  const certificates = getCertificates(publicaddress);
  return res.json(certificates);
})

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
  const token = jwt.sign({ email: req.body.email, role: "organization" }, process.env.SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login Success!", token: token });
});

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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
