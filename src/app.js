// Importing the required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Importing the routers
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");

// Importing a middleware for logging
const { logger } = require("./middlewares/logger");

// Creating an Express application
const app = express();

// Enabling Cross-Origin Resource Sharing
app.use(cors({
  credentials: true
}));

// Using bodyParser middleware to parse JSON data in body requests
app.use(bodyParser.json());

// middleware for logging
app.use(logger);

// Using routers for specific routes
app.use("/", indexRouter);
app.use("/admin", adminRouter);

// Handling requests to undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    error : "Page not found"
  })
})

// Exporting the Express application
module.exports = app;