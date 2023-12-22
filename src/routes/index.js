// Importing the required frameworks, functions and modules
const express = require("express");
const fileUpload = require("express-fileupload");
const { loginHandler, signupHandler } = require("../services/AuthenticationService");

const { tokenVerification } = require("../middlewares/tokenVerificationMiddleware");
const { onlyOrganization } = require("../middlewares/onlyOrganizationMiddleware");
const { onlyUser } = require("../middlewares/onlyUserMiddleware");

const {dashboardHandler, digiLockerHandler, certificateVerificationHandler, issueCertificateHandler} = require("../services/SessionManager.js")

// Creating an instance of Express router
const router = express.Router();

// Defining a route handler for the "GET /" route
router.get("/", (req, res) => {

    // Sending an HTML response for "GET /" route
    res.send("<h1>In Index Page</h1>")
})


// Handling all the GET and POST routes
router.post("/login", loginHandler);

router.post("/signup", signupHandler);

router.get("/dashboard", tokenVerification, dashboardHandler);

router.post("/verify", tokenVerification, certificateVerificationHandler);

// * Routes Only for Users
router.get("/digilocker", tokenVerification, onlyUser , digiLockerHandler);


// * Routes only for Organization
router.put("/issue", tokenVerification, onlyOrganization, fileUpload({ createParentPath : true}), issueCertificateHandler);

// router.post("/refill", tokenVerification, onlyOrganization, refillBalance);

// Exporting the router to use it in the other parts of the application
module.exports = router;