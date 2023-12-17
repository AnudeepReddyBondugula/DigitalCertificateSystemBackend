const express = require("express");
const fileUpload = require("express-fileupload");
const { loginHandler, signupHandler } = require("../services/AuthenticationService");

const { tokenVerification } = require("../middlewares/tokenVerificationMiddleware");
const { onlyOrganization } = require("../middlewares/onlyOrganizationMiddleware");
const { onlyUser } = require("../middlewares/onlyUserMiddleware");

const {dashboardHandler, digiLockerHandler, certificateVerificationHandler, issueCertificateHandler} = require("../services/SessionManager.js")

const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h1>In Index Page</h1>")
})

router.post("/login", loginHandler);

router.post("/signup", signupHandler);

router.get("/dashboard", tokenVerification, dashboardHandler);

router.post("/verify", tokenVerification, certificateVerificationHandler);

// * Routes Only for Users
router.get("/digilocker", tokenVerification, onlyUser , digiLockerHandler);


// * Routes only for Organization
router.put("/issue", tokenVerification, onlyOrganization, fileUpload({ createParentPath : true}), issueCertificateHandler);

// router.post("/refill", tokenVerification, onlyOrganization, refillBalance);

module.exports = router;