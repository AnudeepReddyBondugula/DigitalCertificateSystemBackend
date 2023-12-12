const express = require("express");
const { loginHandler } = require("../controllers/Authentication/loginHandler");
const { signupHandler } = require("../controllers/Authentication/signupHandler");
const {verifyToken} = require("../controllers/Authentication/verifyToken");
const {dashboardHandler} = require("../controllers/dashboardHandler");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h1>In Index Page</h1>")
})

router.post("/login", loginHandler);

router.post("/signup", signupHandler);

router.get("/dashboard", verifyToken, dashboardHandler);

module.exports = router;