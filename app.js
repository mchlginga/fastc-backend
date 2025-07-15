const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const PATHS = require("./utils/paths");
const ensureDirExist = require("./utils/ensureDirExist");
const authRoute = require("./routes/auth.routes");
const errorHandling = require("./middlewares/errorHandling");

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
app.use("/api", authRoute);

// middleware custom error handling
app.use(errorHandling);

app.use( (req, res) => {
    res.status(404).json({ message: "Route not found." });
});

module.exports = app;