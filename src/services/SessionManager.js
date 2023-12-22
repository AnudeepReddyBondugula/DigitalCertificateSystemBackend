// Importing four functions (related to session management) from different files
const {dashboardHandler} = require("../controllers/SessionControllers/dashboardHandler");
const { digiLockerHandler } = require("../controllers/SessionControllers/digiLockerHandler");
const { certificateVerificationHandler } = require("../controllers/SessionControllers/certificateVerificationHandler");
const { issueCertificateHandler } = require("../controllers/SessionControllers/issueCertificateHandler");

// Exporting all imported files as an object to use in the other parts of the application
module.exports = {certificateVerificationHandler, dashboardHandler, digiLockerHandler, issueCertificateHandler}