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

const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h1>In Index Page</h1>")
})

router.post("/login", loginHandler);

router.post("/signup", signupHandler);

router.get("/dashboard", tokenVerification, dashboardHandler);

router.post("/verify", tokenVerification, certificateVerificationHandler);

router.post("/issue", tokenVerification, onlyOrganization, issueCertificateHandler);

router.post("/digilocker", tokenVerification, onlyUser , digiLockerHandler);

module.exports = router;