const {dashboardHandler} = require("../controllers/SessionControllers/dashboardHandler");
const { digiLockerHandler } = require("../controllers/SessionControllers/digiLockerHandler");
const { certificateVerificationHandler } = require("../controllers/SessionControllers/certificateVerificationHandler");
const { issueCertificateHandler } = require("../controllers/SessionControllers/issueCertificateHandler");

module.exports = {certificateVerificationHandler, dashboardHandler, digiLockerHandler, issueCertificateHandler}