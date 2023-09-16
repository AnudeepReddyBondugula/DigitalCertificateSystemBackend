// * Importing packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {
  getPublicKey,
  getAddress,
  encrypt,
  decrpyt,
} = require("./utils/crypto-helper");

const {
    addMinter
} = require("./utils/blockchain-helper");
require("dotenv").config();

// * Creating Server
const app = express();
const port = 3000;

// * Schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  publicaddress: String,
  privatekey: String,
  aadharcard: String, 
  certificates: [String], // ? optional
});

const organizationSchema = new mongoose.Schema({
  username: String,
  password: String,
  publicaddress: String,
  privatekey: String,
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
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    const user = await (req.body.role == "student"
      ? User.findOne({ username, password })
      : Organization.findOne({ username, password }));

    if (user) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};

// * Routes

// ** USER ROUTES
app.post("/user/login", verifyCred, async (req, res) => {
  const token = jwt.sign({ username: req.body.username }, process.env.SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login Success!", token: token });
});

app.post("/user/signup", async (req, res) => {
  const { username, password, privatekey, aadharcard } = req.body;

  if (!(username && password && privatekey && aadharcard)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  // TODO: Validate for username, privateKey and aadharcard later

  // * Check if user aldready exists!
  // ? validate also for users having same public address(optional)
  const user = await User.findOne({ username });
  if (user) {
    return res.status(401).json({ message: "User Aldready Exists!" });
  }
  const publicaddress = getAddress(getPublicKey(privatekey));
  const cipherText = encrypt(privatekey, password);
  const newUser = new User({
    username,
    password,
    publicaddress,
    privatekey: cipherText,
    aadharcard,
  });

  await newUser.save();

  const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: "1h" });

  res.status(201).json({ message: "User Created Successfully", token: token });
});

app.get("/user/dashboard", verifyToken, async (req, res) => {
  const { username } = req.body;
  res.json({ message: "DashBoard Success!", user: req.user });
});

// * ORGANISATION ROUTES
app.post("/org/login", verifyCred, async (req, res) => {
  const token = jwt.sign({ username: req.body.username }, process.env.SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login Success!", token: token });
});

app.post("/org/signup", async (req, res) => {
    try{
        const { username, password, privatekey } = req.body;
        if (!(username && password && privatekey)) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        
        // TODO: Validate for username, privateKey later
    
        // * Check if user aldready exists!
        // ? validate also for users having same public address(optional)
        const user = await Organization.findOne({ username });
        if (user) {
            return res.status(401).json({ message: "User Aldready Exists!" });
        }
        const publicaddress = getAddress(getPublicKey(privatekey));
        const cipherText = encrypt(privatekey, password);
        const newUser = new Organization({
            username,
            password,
            publicaddress,
            privatekey: cipherText,
        });

        await newUser.save();

        const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: "1h" });

        await addMinter(publicaddress, "These consists of details of the Organization");
  
        res.status(201).json({ message: "User Created Successfully", token: token });
    }
    catch(err){
        res.status(500).json("Internal Server Error!");
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
