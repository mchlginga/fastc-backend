const path = require("path");

const PATHS = {
    logFile: path.join(__dirname, "..", "data", "access.log"),
    profileDir: path.join(__dirname, "..", "data", "profiles")
};

module.exports = PATHS;