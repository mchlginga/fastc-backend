const protect = require("./auth");
const errorHandling = require("./errorHandling");
const checkRole = require("./role");
const upload = require("./upload");

module.exports = {
    protect,
    errorHandling,
    checkRole,
    upload
};