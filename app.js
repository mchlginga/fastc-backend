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
const authRoutes = require("./routes/authRoute");
const traineeRoutes = require("./routes/traineeRoute");
const uploadRoutes = require("./routes/uploadRoute");
const certificateRoutes = require("./routes/certRoute");
const jobRoutes = require("./routes/jobRoute");
const matchRoutes = require("./routes/matchRoute");

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
app.use("/api/auth", authRoutes);

// trainee routes
app.use("/api/trainee", traineeRoutes);

// upload routes
app.use("/api/upload", uploadRoutes);

// certificate routes
app.use("/api/certificate", certificateRoutes);

// job routes
app.use("/api/job", jobRoutes)

// match routes
app.use("/api/match", matchRoutes);

// middleware custom error handling
app.use(errorHandling);

app.use( (req, res) => {
    res.status(statusCodes.NOT_FOUND).json({ message: "Route not found." });
});

module.exports = app;