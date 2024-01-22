// Importing the Express.js framework
const express = require("express");

// Creating an instance of Express router
const router = express.Router();

// Defining a route handler for the "GET / " route
router.get("/", (req, res) => {

    // Sending an HTML response for the "GET /" route
    res.send("<h1>In Admin Page</h1>")
})

// Exporting the router to use it in the other parts of the application
module.exports = router;