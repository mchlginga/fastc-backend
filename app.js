const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

// utils
const { PATHS, ensureDirExist } = require("./utils/index");

// middleware
const errorHandling = require("./middlewares/errorHandling");

// routes
const authRoute = require("./routes/auth.routes");
const traineeRoutes = require("./routes/trainee.routes");

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
app.use("/api/auth", authRoute);

// trainee routes
app.use("/api/trainee", traineeRoutes);

// middleware custom error handling
app.use(errorHandling);

app.use( (req, res) => {
    res.status(404).json({ message: "Route not found." });
});

module.exports = app;