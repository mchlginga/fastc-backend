const protect = require("./authMiddleware");
const errorHandling = require("./errorHandling");
const checkRole = require("./roleMiddleware");
const upload = require("./uploadMiddleware");

module.exports = {
    protect,
    errorHandling,
    checkRole,
    upload
};