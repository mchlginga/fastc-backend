const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const PATHS = require("./utils/paths.js");
const ensureDirExist = require("./utils/ensureDirExist.js");

const app = express();

// basic middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// request logging (morgan)
ensureDirExist(PATHS.logFile);
const accessLogStream = fs.createWriteStream(path.join(PATHS.logFile), {flags: 'a'});
app.use(morgan("combined", { stream: accessLogStream }));

if (process.env.ENV === "development") {
    app.use(morgan("dev"));
}

module.exports = app;