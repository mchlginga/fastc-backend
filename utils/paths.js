const path = require("path");

const PATHS = {
    logFile: path.join(__dirname, "..", "data", "access.log"),
    profileDir: path.join(__dirname, "..", "data", "uploads", "profiles"),
    certHbsFile: path.join(__dirname, "..", "templates", "certificate.hbs")
};

module.exports = PATHS;