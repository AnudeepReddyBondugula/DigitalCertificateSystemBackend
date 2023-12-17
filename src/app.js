const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");

const { logger } = require("./middlewares/logger");

const app = express();

app.use(cors({
  credentials: true
}));

app.use(bodyParser.json());
app.use(logger);
app.use("/", indexRouter);
app.use("/admin", adminRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    error : "Page not found"
  })
})

module.exports = app;