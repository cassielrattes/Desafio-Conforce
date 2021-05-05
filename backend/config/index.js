const express = require("express");
const session = require("express-session");
const cors = require("cors");
// const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    optionsSuccessStatus: 200,
  })
);
app.use(morgan("short"));

app.use("/", require("../routes"));

module.exports = app;
