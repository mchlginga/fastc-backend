const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

// utils
const { 
    PATHS, 
    ensureDirExist, 
    statusCodes 
} = require("./utils/index");

// middleware
const errorHandling = require("./middlewares/errorHandling");

// routes
const auth = require("./routes/auth");
const trainee = require("./routes/trainee");
const upload = require("./routes/upload");
const certificate = require("./routes/certificate");
const job = require("./routes/job");
const match = require("./routes/match");

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

// auth routes 
app.use("/api/auth", auth);

// trainee routes
app.use("/api/trainee", trainee);

// upload routes
app.use("/api/upload", upload);

// certificate routes
app.use("/api/certificate", certificate);

// job routes
app.use("/api/job", job)

// match routes
app.use("/api/match", match);

// middleware custom error handling
app.use(errorHandling);

app.use( (req, res) => {
    res.status(statusCodes.NOT_FOUND).json({ message: "Route not found." });
});

module.exports = app;