const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const organizationRouter = require("./routes/organizations");
const adminRouter = require("./routes/admin");
const app = express();

app.use(cors({
  credentials: true
}));

app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/organization", organizationRouter);
app.use("/admin", adminRouter);

module.exports = app;