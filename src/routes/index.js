// Importing the required frameworks, functions and modules
const express = require("express");
const { loginHandler, signupHandler } = require("../services/AuthenticationService");

const { tokenVerification } = require("../middlewares/tokenVerificationMiddleware");
const { onlyOrganization } = require("../middlewares/onlyOrganizationMiddleware");
const { onlyUser } = require("../middlewares/onlyUserMiddleware");

// TODO : Need to be implemented by Session Manager
const {dashboardHandler} = require("../controllers/SessionControllers/dashboardHandler");
const { digiLockerHandler } = require("../controllers/SessionControllers/digiLockerHandler");
const { certificateVerificationHandler } = require("../controllers/SessionControllers/certificateVerificationHandler");
const { issueCertificateHandler } = require("../controllers/SessionControllers/issueCertificateHandler");

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

router.post("/issue", tokenVerification, onlyOrganization, issueCertificateHandler);

router.post("/digilocker", tokenVerification, onlyUser , digiLockerHandler);

// Exporting the router to use it in the other parts of the application
module.exports = router;