const path = require("path");

const PATHS = {
    logFile: path.join(__dirname, "..", "data", "access.log"),
    profileDir: path.join(__dirname, "..", "data", "uploads", "profiles")
};

module.exports = PATHS;